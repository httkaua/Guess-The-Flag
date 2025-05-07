document.querySelectorAll('.quiz-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const correct = btn.getAttribute('data-correct') === 'true';
    const feedback = document.getElementById('feedback');

    document.querySelectorAll('.quiz-option').forEach(b => {
      b.disabled = true;
      const isCorrect = b.getAttribute('data-correct') === 'true';
      b.classList.add(isCorrect ? 'correct' : 'wrong');
    });

    feedback.textContent = correct ? '✅ Right!' : '❌ Wrong!';
  });
});

// Redo
document.getElementById('redo').addEventListener('click', () => {
  location.reload();
});
