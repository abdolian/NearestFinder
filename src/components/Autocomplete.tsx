// TODO

import { useEffect, useState } from 'react';

import { useCombobox } from 'downshift';
import { useDebounce } from 'use-debounce';

export type AutocompleteProps<T> = {
  debounced?: number;
  items: T[];
  keyProperty: string;
  valueProperty: string;
  onInput?: (query: string) => void;
  onSelect?: (item: T) => void;
};

export const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const {
    debounced,
    items,
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
            placeholder="Best book ever"
            {...combobox.getInputProps()}
          />
          {combobox.selectedItem && (
            <button
              aria-label="clear selection"
              className="px-2"
              type="button"
              onClick={combobox.reset}
            >
              X
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
