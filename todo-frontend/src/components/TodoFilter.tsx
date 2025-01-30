import { useState, useCallback } from "react";
import { TodoFilterRequest } from "../types/TodoFilterRequest";

interface TodoFilterProps {
  onFilterChange: (filter: TodoFilterRequest) => void;
}

const TodoFilter = ({ onFilterChange }: TodoFilterProps) => {
  const [localFilter, setLocalFilter] = useState<TodoFilterRequest>({
    description: "",
    isDone: undefined,
    dueDate: undefined,
    dueDateAfter: undefined,
    dueDateBefore: undefined,
  });

  const handleInputChange = useCallback(
    (
      // performace issue kasuta useCallback
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value, type } = e.target;
      let finalValue: string | boolean | undefined = value;

      if (type === "checkbox") {
        finalValue = (e.target as HTMLInputElement).checked;
      } else if (value === "") {
        finalValue = undefined;
      }

      const newFilter = { ...localFilter, [name]: finalValue };

      //Use one date filter at a time
      if (name === "dueDate") {
        newFilter.dueDateAfter = undefined;
        newFilter.dueDateBefore = undefined;
      } else if (name === "dueDateBefore") {
        newFilter.dueDate = undefined;
        newFilter.dueDateAfter = undefined;
      } else if (name === "dueDateAfter") {
        newFilter.dueDate = undefined;
        newFilter.dueDateBefore = undefined;
      }

      setLocalFilter(newFilter);
      onFilterChange(newFilter);
    },
    [localFilter, onFilterChange]
  );

  const clearFilters = () => {
    const clearedFilter = {
      description: "",
      isDone: undefined,
      dueDate: undefined,
      dueDateAfter: undefined,
      dueDateBefore: undefined,
    };
    setLocalFilter(clearedFilter);
    onFilterChange(clearedFilter);
  };

  return (
    <div className="mb-4">
      <div className="card bg-dark bg-gradient text-white mb-3">
        <div className="card-body">
          <div className="row g-3">
            <h3>Filter</h3>
            <div className="col-md-4">
              <label className="form-label">Description contains:</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={localFilter.description || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Status:</label>
              <select
                className="form-select"
                name="isDone"
                value={localFilter.isDone?.toString() || ""}
                onChange={handleInputChange}
              >
                <option value="">All</option>
                <option value="false">Pending</option>
                <option value="true">Completed</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Due Date After:</label>
              <input
                type="date"
                className="form-control"
                name="dueDateAfter"
                value={localFilter.dueDateAfter || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Due Date Before:</label>
              <input
                type="date"
                className="form-control"
                name="dueDateBefore"
                value={localFilter.dueDateBefore || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Due Date At:</label>
              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={localFilter.dueDate || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12">
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
