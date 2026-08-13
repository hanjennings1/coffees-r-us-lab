function Sidebar({ searchTerm, selectedLocations, onSearchChange, onLocationToggle }) {
  return (
    <div className="sidebar">
      {/* Controlled input — value always reflects searchTerm state, not the DOM's own memory */}
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)} // e.target.value = what was just typed
      />

      {/* Each checkbox: checked = is this location in the array; onChange = toggle it */}
      <label>
        <input
          type="checkbox"
          checked={selectedLocations.includes("Costa Rica")}
          onChange={() => onLocationToggle("Costa Rica")}
        />
        Costa Rica
      </label>

      <label>
        <input
          type="checkbox"
          checked={selectedLocations.includes("Honduras")}
          onChange={() => onLocationToggle("Honduras")}
        />
        Honduras
      </label>

      <label>
        <input
          type="checkbox"
          checked={selectedLocations.includes("Brazil")}
          onChange={() => onLocationToggle("Brazil")}
        />
        Brazil
      </label>

      <label>
        <input
          type="checkbox"
          checked={selectedLocations.includes("Colombia")}
          onChange={() => onLocationToggle("Colombia")}
        />
        Colombia
      </label>
    </div>
  )
}

export default Sidebar