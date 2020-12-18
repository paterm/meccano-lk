interface IReactSelectStyles {
  rounded?: boolean
  size?: 48 | 38
}

interface IReactSelectState {
  isFocused?: boolean
  isSelected?: boolean
  isDisabled?: boolean
  isHover?: boolean
}

export function ReactSelectStyle({ rounded = false, size = 48 }: IReactSelectStyles) {
  return {
    control: (provided: any) => ({
      ...provided,
      borderRadius: rounded ? 24 : 2,
      height: size,
      backgroundColor: 'var(--dark-2)',
      borderColor: 'unset',
      borderStyle: 'unset',
      boxShadow: 'unset',
      cursor: 'pointer',
      padding: size === 48 ? '0 16px 0 24px' : '0 6px 0 16px',
    }),
    menuList: (provided: any) => ({
      ...provided,
      boxShadow: '0 16px 16px -4px rgba(20, 16, 41, 0.06), 0 4px 8px -1px rgba(20, 16, 41, 0.06), 0 0 1px 0 rgba(20, 16, 41, 0.12)',
      backgroundColor: 'white',
      padding: size === 48 ? '16px 0 0 0' : '16px 0',
      zIndex: 3
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      color: 'rgba(20, 1, 41, 0.8)'
    }),
    option: (provided: any, { isDisabled, isFocused, isSelected }: IReactSelectState) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? 'var(--coral)'
          : isFocused
            ? 'var(--midnight-purple-2)'
            : null
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided
    }),
    indicatorSeparator: () => ({ display: 'none' })
  };
}
