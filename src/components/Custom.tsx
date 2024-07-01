import { customFields } from '../types';
import { type CustomFields } from '../types';

type props = {
  custom: Record<CustomFields, number> | null;
  setCustom: React.Dispatch<React.SetStateAction<Record<CustomFields, number> | null>>;
  defaultValues: Record<CustomFields, number>;
};

export const Custom = ({ custom, setCustom, defaultValues }: props) =>
  custom !== null ? (
    <div>
      {customFields.map((customField) => (
        <>
          <label htmlFor={customField}>{customField} : </label>
          <input
            type="number"
            name={customField}
            id={customField}
            min={1}
            defaultValue={defaultValues[customField]}
            onChange={(e) => setCustom({ ...custom, [customField]: +e.target.value })}
          />
        </>
      ))}
    </div>
  ) : null;
