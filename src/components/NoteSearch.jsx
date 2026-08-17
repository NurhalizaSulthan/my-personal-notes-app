import React from 'react';

function NoteSearch({ keyword, onSearch }) {
  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="search"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
        data-testid="note-search-input"
      />
      {keyword && (
        <button
          className="note-search__clear"
          onClick={() => onSearch('')}
          aria-label="Hapus pencarian"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default NoteSearch;