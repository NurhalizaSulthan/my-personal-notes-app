import React from 'react';

function NoteActionButton({ variant, onClick, testId, label }) {
  return (
    <button
      className={`note-item__${variant}-button`}
      type="button"
      onClick={onClick}
      data-testid={testId}
    >
      {label}
    </button>
  );
}

export default NoteActionButton;