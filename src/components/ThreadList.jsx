import ThreadItem from './ThreadItem';

function ThreadList({ threads, users }) {
  const userList = Array.isArray(users) ? users : users?.users;

  if (userList === undefined) {
    return (
      <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-slate-400'>
        Memuat daftar thread...
      </div>
    );
  }

  if (!threads || threads.length === 0) {
    return (
      <div className='rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-10 text-center text-sm text-slate-400'>
        Belum ada thread. Buat diskusi pertama kamu.
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {threads.map((thread) => {
        const threadOwner = userList.filter((user) => user.id === thread.ownerId)[0];
        return (
          <ThreadItem
            {...thread}
            key={thread.id}
            id={thread.id}
            owner={threadOwner && threadOwner.name}
            ownerAvatar={threadOwner && threadOwner.avatar}
          />
        );
      })}
    </div>
  );
}

export default ThreadList;
