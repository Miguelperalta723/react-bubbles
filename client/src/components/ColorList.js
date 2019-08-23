import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { isPropertySignature } from "typescript";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, resetData }, props) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor , setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };


  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('puuuuut', res.data)
        resetData()
        setEditing(false)

      })
      .catch(err => {
        console.log(err.response)
      })

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log('delete', res.data)
        updateColors(colors.filter(color => color.id !== res.data))
        

      })
      .catch(err => {
        console.log(err.response)
      })
  };


  const updateNewColor = e => {
    e.preventDefault();

    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, newColor)
      .then(res => {
        console.log(res)
        updateColors([...colors, newColor])

      })
      .catch(err => {
        console.log(err.response)
      })

  }


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}  >
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <h3>add a color</h3>
      <form onSubmit={updateNewColor}>
        <label>color name
          <input 
            type='text'
            name='name'
            placeholde='color'
            value={newColor.name}
            onChange={(e) => setNewColor({ ...newColor, color: e.target.value })}
          />
        </label>
        <label>hex code
          <input 
            type='text'
            name='hexcode'
            placeholde='hexcode'
            value={newColor.hexcode}
            onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
          />
        </label>
        <button>add</button>
      </form>
    </div>
  );
};

export default ColorList;
