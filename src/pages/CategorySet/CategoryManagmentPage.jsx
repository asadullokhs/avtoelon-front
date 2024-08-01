// CategoryManagementPage.js
import React, { useState } from "react";
import { useInfoContext } from "../../context/Context";
import { toast } from "react-toastify";
import "./CategoryManagmentPage.css";
import Loading from "../../components/Loading/Loading";

const CategoryManagementPage = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useInfoContext();

  console.log(categories);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  if(categories.length == 0){
    return (
      <div className="category-management-page">
        <div className="d-flex justify-content-center">
          <Loading/>
          <Loading/>
          <Loading/>
        </div>
      </div>
    )
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await addCategory({ name: newCategory });
      setNewCategory("");
      toast.success("Category added successfully!");
    } catch (error) {
      toast.error("Error adding category.");
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory.name.trim()) return;
    try {
      await updateCategory(editingCategory._id, { name: editingCategory.name });
      setEditingCategory(null);
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error("Error updating category.");
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Error deleting category.");
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="category-management-page">
      <h1>Category Management</h1>
      <div className="category-add-form">
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category._id} className="category-card">
            {editingCategory && editingCategory._id === category._id ? (
              <div className="category-edit-form">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                />
                <div className="category-card-actions">
                  <button onClick={handleUpdateCategory}>Save</button>
                  <button onClick={() => setEditingCategory(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="category-card-content">
                {category.image?.url ? (
                  <img
                    src={category.image.url}
                    alt={category.name}
                    className="category-card-image"
                  />
                ) : (
                  <div className="category-card-icon">
                    <i className="fas fa-folder-open"></i>
                  </div>
                )}
                <span className="category-name">{category.name}</span>
                <div className="category-card-actions">
                  <button onClick={() => setEditingCategory(category)}>Edit</button>
                  <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagementPage;
