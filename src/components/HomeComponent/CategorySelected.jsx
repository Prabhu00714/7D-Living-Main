import React from 'react'

const CategorySelected = ({ selectedComponent }) => {
    console.log(selectedComponent)
    return <div style={{ position: 'absolute', top: 100 }}> {selectedComponent}</div>
}

export default CategorySelected