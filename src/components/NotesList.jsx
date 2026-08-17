import React from 'react';
import NoteItem from './NoteItem';

function groupByMonthYear(notes) {
  return notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(note);
    return groups;
  }, {});
}

function formatGroupHeader(key) {
  const [year, month] = key.split('-');
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });
}

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list', searchKeyword }) {
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const grouped = groupByMonthYear(notes);

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {Object.entries(grouped).map(([groupKey, groupNotes]) => (
        <section
          key={groupKey}
          className="notes-group"
          data-testid={`${groupKey}-group`}
        >
          <div className="notes-group__header">
            <h3 className="notes-group__title">{formatGroupHeader(groupKey)}</h3>
            <span
              className="notes-group__count"
              data-testid={`${groupKey}-group-count`}
            >
              {groupNotes.length} catatan
            </span>
          </div>
          <div className="notes-group__items">
            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;