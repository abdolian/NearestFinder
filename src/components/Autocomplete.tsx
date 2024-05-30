// TODO

import { useEffect, useState } from 'react';

import { useCombobox } from 'downshift';
import { useDebounce } from 'use-debounce';

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

  const [query, setQuery] = useState<string>('');

  const [queryDebounced] = useDebounce(query, debounced || 0);

  const combobox = useCombobox({
    items,
    itemToString(item) {
      if (!item) return '';
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
    return (item as any)?.[keyProperty] ?? '';
  }

  const getValue = (item: T): string => {
    return (item as any)?.[valueProperty] ?? '';
  }

  useEffect(() => onInput?.(query), [queryDebounced]);

  return (
    <div>
      <div className="w-72 flex flex-col gap-1">
        <div className="flex shadow-sm bg-white gap-0.5">
          <input
            className="w-full p-1.5"
            placeholder="Type here"
            {...combobox.getInputProps()}
          />
          {loading && (
            <div
              aria-label="loading"
              className="w-6 h-6 animate-spin inline-block border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
              role="status"
            />
          )}

          {combobox.selectedItem && (
            <button
              aria-label="clear selection"
              className="px-2"
              type="button"
              onClick={combobox.reset}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <ul
        className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${!(combobox.isOpen && items.length) && 'hidden'}`}
        {...combobox.getMenuProps()}
      >
        {combobox.isOpen &&
          items.map((item, index) => (
            <li
              // className={cx(
              //   highlightedIndex === index && 'bg-blue-300',
              //   selectedItem === item && 'font-bold',
              //   'py-2 px-3 shadow-sm flex flex-col',
              // )}
              key={getKey(item)}
              {...combobox.getItemProps({ item, index })}
            >
              <span>{getValue(item)}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
