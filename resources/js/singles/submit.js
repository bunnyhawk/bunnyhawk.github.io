import Pristine from 'pristinejs';

const API_URL = 'https://rdgqc6nd42.execute-api.us-west-2.amazonaws.com/dev/send-mail';

const submitForm = document.getElementById('honorForm');
const fileSubmit = document.getElementById('submissionProof');
const submitButton = submitForm.querySelector('[type="submit"]');

const pristine = new Pristine(submitForm);

const onSubmit = async (event) => {
  event.preventDefault();

  if (pristine.validate()) {
    submitButton.disabled = true;

    const { submissionProof, ...rest } = Object.fromEntries(new FormData(event.target).entries());
    const body = new FormData();

    Object.keys(rest).forEach((name) => {
      body.append(name, rest[name]);
    });

    [...fileSubmit.files].forEach((file) => {
      body.append(file.name, file);
    });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body,
      });
    } catch (err) {
      submitButton.disabled = false;
    }

    submitButton.disabled = false;
    window.location.href = '/submitted/';
  }
};

function onFileUpload(e) {
  let fileName = '';
  if (this.files && this.files.length > 1) {
    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
  } else {
    fileName = e.target.value.split('\\').pop();
  }

  if (fileName) fileSubmit.parentElement.querySelector('span').innerHTML = fileName;
}

fileSubmit.addEventListener('change', onFileUpload);
submitForm.addEventListener('submit', onSubmit);
