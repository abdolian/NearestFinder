import { useEffect, useState } from "react";

import classnames from "classnames";
import { useCombobox } from "downshift";
import { useDebounce } from "use-debounce";

export type AutocompleteProps<T> = {
  debounced?: number;
  items: T[];
  loading?: boolean;
  keyProperty: string;
  valueProperty: string;
  onInput?: (query: string) => void;
  onSelect?: (item: T) => void;
};

export const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const {
    debounced,
    items,
    loading,
    keyProperty,
    valueProperty,
    onInput,
    onSelect
  } = props;

  const [query, setQuery] = useState<string>("");

  const [queryDebounced] = useDebounce(query, debounced || 0);

  const combobox = useCombobox({
    items,
    itemToString(item) {
      if (!item) return "";
      return getValue(item);
    },
    onSelectedItemChange({ selectedItem }) {
      onSelect?.(selectedItem);
    },
    onInputValueChange({ inputValue }) {
      setQuery(inputValue);
    },
  })

  const getKey = (item: T): string => {
    return (item as any)?.[keyProperty] ?? "";
  }

  const getValue = (item: T): string => {
    return (item as any)?.[valueProperty] ?? "";
  }

  useEffect(() => {
    if (query != queryDebounced) return;
    onInput?.(query);
  }, [query, queryDebounced, onInput]);

  return (
    <div className="relative">
      <input
        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base"
        placeholder="Type here"
        type="text"
        {...combobox.getInputProps()}
      />
      {loading && (
        <div
          className="absolute top-[0.8rem] right-[0.8rem] w-6 h-6 animate-spin inline-block border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
          role="status"
        />
      )}
      {combobox.selectedItem && !loading && (
        <button
          className="absolute top-[0.45rem] right-[0.45rem]"
          type="button"
          onClick={combobox.reset}
        >
          <svg className="fill-gray-500" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
      )}
      <div
        className={classnames(
          "absolute max-h-40 overflow-y-auto z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-full mt-1", {
          hidden: !(combobox.isOpen && items.length)
        })}
        {...combobox.getMenuProps()}
      >
        <ul className="py-2 text-sm text-gray-700">
          {combobox.isOpen &&
            items.map((item, index) => (
              <li
                className={classnames("block px-4 py-2 hover:bg-gray-200 cursor-pointer", {
                  "bg-gray-200": combobox.highlightedIndex === index,
                })}
                key={getKey(item)}
                {...combobox.getItemProps({ item, index })}
              >
                {getValue(item)}
              </li>
            ))}
        </ul>
      </div>

    </div >
  )
}
