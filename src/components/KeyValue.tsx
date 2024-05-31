export type KeyValueProps = {
  title: string;
  items: [string, any][];
};

export function KeyValue({ title, items }: KeyValueProps) {
  return (
    <div className="max-h-full rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-2 divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-800">
        {items.map((item) => (
          <dl key={item[0]} className="flex items-center justify-between gap-4 py-2">
            <dt className="text-sm font-medium text-gray-900 dark:text-white">
              {item[0]}
            </dt>
            <dd className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {item[1]}
            </dd>
          </dl>
        ))}
      </div>
    </div>
  )
}