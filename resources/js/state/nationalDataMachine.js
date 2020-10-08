import { createMachine, interpret, assign } from 'xstate';

const SUMMARY_API = 'https://api.covidtracking.com/v1/us/current.json';
const INITIAL_DATA = 202675;

function updateData(deaths) {
  const dataContainer = document.getElementById('initialCount');
  dataContainer.innerHTML = deaths.toLocaleString();
  dataContainer.classList.toggle('loaded');
}

const fetchData = () => {
  const localData = sessionStorage.getItem('nationalData');

  if (localData) {
    const parsedData = JSON.parse(localData);
    updateData(parsedData.death);
    return new Promise(((resolve) => resolve({ data: parsedData })));
  }
  const handleFetch = async () => {
    try {
      const response = await fetch(SUMMARY_API);
      const data = await response.json();

      sessionStorage.setItem('nationalData', JSON.stringify(data[0]));
      updateData(data.death);
      return { data: data[0] };
    } catch (err) {
      updateData(INITIAL_DATA);
      return { data: INITIAL_DATA };
    }
  };
  return handleFetch();
};

const nationalDataMachine = createMachine(
  {
    id: 'NAMES',
    initial: 'idle',
    context: {
      data: null,
    },
    states: {
      idle: {
        on: {
          FETCH: 'loading',
        },
      },
      loading: {
        invoke: {
          id: 'fetchData',
          src: fetchData,
          onDone: {
            target: 'resolved',
            actions: ['setData'],
          },
          onError: 'rejected',
        },
        on: {
          CANCEL: 'idle',
        },
      },
      resolved: {
        type: 'final',
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
      setData: assign((_, { data }) => data),
    },
  },
);

export const nationalDataService = interpret(nationalDataMachine, { devTools: true })
  .onTransition((state) => console.log(state.value))
  .start();

nationalDataService.send('FETCH');
