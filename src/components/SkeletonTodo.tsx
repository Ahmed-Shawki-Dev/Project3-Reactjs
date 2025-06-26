const SkeletonTodo = () => {
  return (
    <div className="min-h-[120px] w-[90%] max-w-2xl mx-auto bg-surface rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between text-text animate-pulse">
      {/* Text Content Skeleton */}
      <div className="w-full sm:w-[70%] space-y-3">
        <div className="h-5 w-2/3 bg-border rounded-md mb-2" />
        <div className="h-4 w-full bg-border rounded-md" />
        <div className="h-4 w-5/6 bg-border rounded-md" />
      </div>
      {/* Buttons Skeleton */}
      <div className="flex flex-row gap-3 w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0">
        <div className="h-10 w-20 bg-border rounded-xl" />
        <div className="h-10 w-20 bg-border rounded-xl" />
      </div>
    </div>
  )
}

export default SkeletonTodo

export const EmptyTodos = ({ onAdd }: { onAdd?: () => void }) => (
  <div className="flex flex-col items-center justify-center w-full min-h-[300px] py-12">
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      className="mb-6"
    >
      <rect
        x="10"
        y="30"
        width="100"
        height="60"
        rx="16"
        fill="var(--color-surface-alt)"
      />
      <rect
        x="25"
        y="50"
        width="70"
        height="10"
        rx="5"
        fill="var(--color-border)"
      />
      <rect
        x="25"
        y="65"
        width="40"
        height="10"
        rx="5"
        fill="var(--color-border)"
      />
      <rect
        x="70"
        y="65"
        width="25"
        height="10"
        rx="5"
        fill="var(--color-border)"
      />
      <circle cx="60" cy="90" r="6" fill="var(--color-primary)" />
    </svg>
    <h2 className="text-2xl font-bold text-primary mb-2">No Todos Yet</h2>
    <p className="text-text-secondary mb-6 text-center max-w-xs">
      You haven't added any todos yet. Start by creating your first one and stay
      organized!
    </p>
    {onAdd && (
      <button
        onClick={onAdd}
        className="bg-primary hover:bg-primary-hover text-on-primary px-6 py-2 rounded-lg font-semibold shadow transition-colors"
      >
        Add Todo
      </button>
    )}
  </div>
)
