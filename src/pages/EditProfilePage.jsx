import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import Card from '../components/common/Card';

// Mock profile data
const initialProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 9876543210',
  address: 'Hostel Block A, Room 201, Delhi University, New Delhi - 110007',
  dietaryType: 'Non-Veg',
  favoriteCuisines: ['North Indian', 'Mughlai', 'Chinese']
};

const cuisineOptions = [
  'North Indian', 'South Indian', 'Mughlai', 'Chinese', 
  'Continental', 'Coastal', 'Maharashtrian', 'Gujarati', 
  'Bengali', 'Punjabi', 'Kerala', 'Tamil'
];

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialProfile);
  const [selectedCuisines, setSelectedCuisines] = useState(initialProfile.favoriteCuisines);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleCuisine = (cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock update
    alert('Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb backTo="/profile" backText="← Back to Profile" />

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
            Edit Profile
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                Personal Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--gray-500)',
                      color: 'var(--gray-900)'
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--gray-500)',
                      color: 'var(--gray-900)'
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--gray-500)',
                      color: 'var(--gray-900)'
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--gray-500)',
                      color: 'var(--gray-900)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Food Preferences */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                Food Preferences
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                    Dietary Preference *
                  </label>
                  <select
                    name="dietaryType"
                    value={formData.dietaryType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--gray-500)',
                      color: 'var(--gray-900)'
                    }}
                  >
                    <option value="Veg">Vegetarian</option>
                    <option value="Non-Veg">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-3 font-medium" style={{ color: 'var(--gray-900)' }}>
                    Favorite Cuisines (Select multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cuisineOptions.map((cuisine) => (
                      <button
                        key={cuisine}
                        type="button"
                        onClick={() => toggleCuisine(cuisine)}
                        className="px-4 py-2 rounded-full font-medium transition-colors"
                        style={{
                          backgroundColor: selectedCuisines.includes(cuisine) 
                            ? 'var(--primary-500)' 
                            : 'var(--gray-100)',
                          color: selectedCuisines.includes(cuisine) 
                            ? 'var(--white)' 
                            : 'var(--gray-700)'
                        }}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg font-semibold"
                style={{ 
                  backgroundColor: 'var(--primary-500)', 
                  color: 'var(--white)' 
                }}
              >
                Save Changes
              </button>
              <Link
                to="/profile"
                className="flex-1 py-3 rounded-lg font-semibold text-center"
                style={{
                  backgroundColor: 'var(--white)',
                  color: 'var(--gray-700)',
                  border: '2px solid var(--gray-500)'
                }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfilePage;
