import { Group, Image, Menu, UnstyledButton } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './style.module.css';

interface IMultiOptionPicker {
  data: [{ label: string; icon?: any }];
  label?: string;
  onChange: (item: string) => void;
}

export function MultiOptionPicker({ data, label, onChange }: IMultiOptionPicker) {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);
  const items = data.map((item) => (
    <Menu.Item
      leftSection={item.icon && <Image src={item.icon} width={18} height={18} />}
      onClick={() => {
        onChange(item.label)
        setSelected(item)}}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <div>
      {label}
      <Menu
        onOpen={() => setOpened(true)}
        onClose={() => setOpened(false)}
        radius="md"
        width="target"
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
            <Group gap="xs">
              {selected.icon && <Image src={selected.icon} width={22} height={22} />}
              <span className={classes.label}>{selected.label}</span>
            </Group>
            <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>{items}</Menu.Dropdown>
      </Menu>
    </div>
  );
}
