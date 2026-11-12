(() => {
  const questions = [
    { title: 'How old are you?', answers: ['Under 18', '18–45', 'Over 45'] },
    { title: 'Has your vision been stable over the past year?', answers: ['Yes', 'No', "I don't know"] },
    { title: 'What is your level of nearsightedness, if any?', answers: ['Up to −3 diopters', '−3 to −6 diopters', 'More than −6 diopters', "I don't have nearsightedness"] },
    { title: 'What is your level of farsightedness, if any?', answers: ['Up to +3 diopters', 'More than +3 diopters', "I don't have farsightedness"] },
    { title: 'Do you have astigmatism? If so, how much?', answers: ['Up to 4 diopters', 'More than 4 diopters', "I don't have astigmatism"] },
    { title: 'Do you have a condition that could affect your vision, such as diabetes, high blood pressure, or a diagnosed retinal condition?', answers: ['Yes', 'No', "I don't know"] }
  ];
  const root = document.createElement('div');
  root.className = 'cv-quiz'; root.hidden = true;
  root.innerHTML = `<div class="cv-quiz__dialog" role="dialog" aria-modal="true" aria-labelledby="cv-quiz-title" tabindex="-1"><button class="cv-quiz__close" type="button" aria-label="Close quiz">×</button><p class="cv-quiz__eyebrow">Clear Vision</p><h2 class="cv-quiz__title" id="cv-quiz-title">Explore your vision correction options</h2><div class="cv-quiz__content" aria-live="polite"></div></div>`;
  document.body.appendChild(root);
  const dialog = root.querySelector('.cv-quiz__dialog'), content = root.querySelector('.cv-quiz__content');
  let step = 0, responses = Array(questions.length).fill(null), opener = null, previousOverflow = '';
  function openQuiz(event) { event.preventDefault(); opener = event.currentTarget; step = 0; responses = Array(questions.length).fill(null); previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; root.hidden = false; render(); dialog.focus(); }
  function closeQuiz() { root.hidden = true; document.body.style.overflow = previousOverflow; if (opener) opener.focus(); }
  function render() {
    if (step === questions.length) {
      content.innerHTML = `<p class="cv-quiz__progress-label">Questionnaire complete</p><div class="cv-quiz__progress"><span style="width:100%"></span></div><h3 class="cv-quiz__question">Your next step</h3><p class="cv-quiz__result">Your answers can help you prepare for a consultation. An ophthalmologist needs to examine your eyes and medical history to determine whether laser vision correction is appropriate and which options to consider.</p><div class="cv-quiz__actions"><button class="cv-quiz__button cv-quiz__button--back" type="button" data-action="back">Back</button><button class="cv-quiz__button" type="button" data-action="contact">Contact us</button></div>`;
      return;
    }
    const question = questions[step];
    content.innerHTML = `<p class="cv-quiz__progress-label">Question ${step + 1} of ${questions.length}</p><div class="cv-quiz__progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${step + 1}"><span style="width:${(step + 1) / questions.length * 100}%"></span></div><h3 class="cv-quiz__question" id="cv-quiz-question">${question.title}</h3><fieldset class="cv-quiz__options" aria-labelledby="cv-quiz-question">${question.answers.map((answer, i) => `<label class="cv-quiz__option"><input type="radio" name="cv-quiz-answer" value="${i}" ${responses[step] === i ? 'checked' : ''}><span>${answer}</span></label>`).join('')}</fieldset><div class="cv-quiz__actions">${step ? '<button class="cv-quiz__button cv-quiz__button--back" type="button" data-action="back">Back</button>' : '<span></span>'}<button class="cv-quiz__button" type="button" data-action="next" ${responses[step] === null ? 'disabled' : ''}>${step === questions.length - 1 ? 'See result' : 'Next'}</button></div>`;
  }
  content.addEventListener('change', event => { if (event.target.name === 'cv-quiz-answer') { responses[step] = Number(event.target.value); content.querySelector('[data-action="next"]').disabled = false; } });
  content.addEventListener('click', event => { const action = event.target.closest('[data-action]')?.dataset.action; if (action === 'next' && responses[step] !== null) { step++; render(); dialog.focus(); } else if (action === 'back') { step--; render(); dialog.focus(); } else if (action === 'contact') { closeQuiz(); const target = document.getElementById('rec1161210641'); if (target) target.scrollIntoView({ behavior: 'smooth' }); } });
  root.querySelector('.cv-quiz__close').addEventListener('click', closeQuiz);
  root.addEventListener('click', event => { if (event.target === root) closeQuiz(); });
  document.addEventListener('keydown', event => { if (root.hidden) return; if (event.key === 'Escape') { event.preventDefault(); closeQuiz(); } else if (event.key === 'Tab') { const items = [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled])')]; if (!items.length) return; const first = items[0], last = items[items.length - 1]; if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } });
  document.querySelectorAll('a[href="#clearvision-quiz"]').forEach(link => link.addEventListener('click', openQuiz));
})();
