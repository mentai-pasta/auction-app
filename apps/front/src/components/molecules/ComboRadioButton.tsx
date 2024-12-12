export interface ButtonAttribute {
  label: string;
  value: number;
  checked?: boolean;
}

interface ComboButtonProps {
  title: string;
  buttonAttributes: ButtonAttribute[];
  name: string;
}

export const ComboRadioButton = ({ buttonAttributes, title, name }: ComboButtonProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h2>{title}</h2>
      <div className="w-full flex justify-between flex-wrap gap-y-3">
        {buttonAttributes.map((v, i) => (
          <div className="form-control" key={i * 2}>
            <input
              className="hidden peer"
              key={i * 2 + 1}
              defaultChecked={v.checked}
              type="radio"
              id={String(v.value)}
              name={name}
              value={String(v.value)}
            />
            <label
              htmlFor={String(v.value)}
              key={i * 2 + 2}
              onChange={() => {}}
              className="peer-checked:bg-neutral peer-checked:text-neutral-content min-w-fit py-1 rounded-full bg-base-300 text-xl px-2 hover:cursor-pointer"
            >
              {v.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
