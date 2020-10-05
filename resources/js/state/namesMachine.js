import { createMachine, interpret, assign } from 'xstate';
import { setupToolTips } from '@modules/tooltips';
import { nameList } from '../components';
import initialData from '../initialData.json';

const mapRecords = (records) => records.map((record) => ({
  id: record.id,
  ...record.fields,
}));

const buildList = (records) => {
  const mappedRecords = mapRecords(records);
  document.getElementById('nameList').innerHTML = nameList(mappedRecords);
  setTimeout(() => setupToolTips(), 1000);
};

const AIR_TABLE_BASE_URL = 'https://api.airtable.com/v0/appAaEysX2qTVLYXy/covid-memorial?view=Grid%20view';

const fetchData = (context, { query, offset }) => {
  let url = AIR_TABLE_BASE_URL;

  if (query) {
    url += `&filterByFormula=SEARCH("${query.toLowerCase()}",LOWER({name}))`;
  } else if (offset) {
    url += `&offset=${offset}`;
  }

  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const records = query ? res.records : [...context.names, ...res.records];
      buildList(records);
      return { ...res, records };
    });
};

const fetchInitialData = () => new Promise((resolve) => {
  buildList(initialData.records);
  return resolve(initialData);
});

const fetchMachine = createMachine(
  {
    id: 'NAMES',
    initial: 'idle',
    context: {
      names: [],
      offset: null,
    },
    states: {
      idle: {
        on: {
          FETCH: 'loading',
          INITIALIZE: 'loadingInitial',
        },
      },
      loadingInitial: {
        invoke: {
          src: fetchInitialData,
          onDone: {
            target: 'idle',
            actions: ['setOffset', 'setResults'],
          },
          onError: 'rejected',
        },
      },
      loading: {
        invoke: {
          id: 'fetchData',
          src: fetchData,
          onDone: {
            target: 'idle',
            actions: ['setOffset', 'setResults'],
          },
          onError: 'rejected',
        },
        on: {
          CANCEL: 'idle',
        },
      },
      rejected: {
        on: {
          FETCH: 'loading',
        },
      },
    },
  },
  {
    actions: {
      setResults: assign((_, event) => ({
        names: event.data.records,
      })),
      setOffset: assign((_, event) => ({
        offset: event.data.offset,
      })),
    },
  },
);

export const namesService = interpret(fetchMachine, { devTools: true })
  .onTransition((state) => console.log(state.value))
  .start();

namesService.send('INITIALIZE');
