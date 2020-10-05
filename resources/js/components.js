const closeIcon = () => `
  <button type="button" aria-label="close">
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.25"
        d="M6.10321 8.52844L0.462891 2.62691L2.45707 0.540405L8.09731 6.44189L13.7375 0.540405L15.7317 2.62691L10.0914 8.52844L15.7316 14.4299L13.7375 16.5163L8.09731 10.6149L2.45707 16.5163L0.462977 14.4299L6.10321 8.52844Z"
        fill="black"
      />
    </svg>
  </button>
`;

const nameDetails = (person) => `${person.name}<span class="hidden sm:inline">, ${person.age}, ${person.location}</span>`;

const tooltip = (person) => `
  <div id="${person.id}" class="bg-text text-theme tooltip border border-solid border-black text-sm" role="tooltip">
    <div class="p-6">
      <div class="float-right sm:hidden">
        ${closeIcon()}
      </div>
      <strong>${person.name}</strong>
      <br />
      ${person.age}, ${person.location}
      <p class="my-2 italic">${person.about}</p>
      <p class="opacity-50">
        Source: ${person.source} ${person.relation ? person.relation : ''}
      </p>
    </div>
  </div>    
`;
const name = (person) => `<li class="nameList__item relative">
  <span id="name-${person.id}"class="pr-2 nameList__itemRecord active:text-primary hover:text-primary focus:text-primary" tabindex="0" aria-describedby="${person.id}">
    ${nameDetails(person)}
    
  </span>
  ${tooltip(person)}
</li>`;

export const nameList = (names) => `<ul class="text-left">${names.map((person) => name(person)).join('')}</ul>`;
