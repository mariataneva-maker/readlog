export const books = [
  {
    id: 1,
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    status: "reading",
    progress: 42,
    quotes: 14,
    notes: 6,
    cover: "#1a1a1a",
  },
  {
    id: 2,
    title: "Middlemarch",
    author: "George Eliot",
    status: "finished",
    progress: 100,
    quotes: 31,
    notes: 12,
    cover: "#2d2d2d",
  },
  {
    id: 3,
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    status: "finished",
    progress: 100,
    quotes: 9,
    notes: 4,
    cover: "#111",
  },
  {
    id: 4,
    title: "Pachinko",
    author: "Min Jin Lee",
    status: "want-to-read",
    progress: 0,
    quotes: 0,
    notes: 0,
    cover: "#222",
  },
];

export const sampleQuotes = [
  {
    id: 1,
    bookId: 1,
    text: "The awful thing is that beauty is mysterious as well as terrible. God and the devil are fighting there and the battlefield is the heart of man.",
    page: 108,
    date: "Feb 12",
  },
  {
    id: 2,
    bookId: 1,
    text: "Above all, don't lie to yourself. The man who lies to himself and listens to his own lie comes to a point that he cannot distinguish the truth within him.",
    page: 44,
    date: "Feb 8",
  },
];

export const sampleNotes = [
  {
    id: 1,
    bookId: 1,
    text: "The tension between Ivan's intellectual atheism and Alyosha's faith feels incredibly modern. Dostoevsky gives both sides real weight.",
    date: "Feb 14",
    type: "impression",
  },
  {
    id: 2,
    bookId: 1,
    text: "The Grand Inquisitor chapter is one of the most astonishing things I've ever read.",
    date: "Feb 13",
    type: "note",
  },
];

export const statusLabel = {
  reading: "Reading",
  finished: "Finished",
  "want-to-read": "Want to Read",
};

export const statusColor = {
  reading: "#000",
  finished: "#555",
  "want-to-read": "#999",
};
