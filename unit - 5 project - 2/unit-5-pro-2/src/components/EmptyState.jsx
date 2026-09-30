function EmptyState({
  icon = '🎉',
  title = 'No tasks for today 🎉',
  message = 'You are all caught up! Enjoy your free time or add a new study goal.',
  actionText = '+ Add Task',
  onAction
}) {
  return (
    <div className="study-empty-state">
      <div className="empty-icon-bubble">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{message}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn-empty-action"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
