import BlogFooter from "./BlogFooter";
import axios from 'axios';
import React, { useState } from 'react';
import 'primeicons/primeicons.css';

const About = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const description = {
    'melanoma': "Melanoma is a type of skin cancer that develops from melanocytes, the pigment-producing cells in the skin. It often appears as a new or changing mole or pigmented lesion on the skin. If left untreated, melanoma can spread to other parts of the body, leading to serious illness and even death.",
    'actinic keratosis': "Actinic keratosis is a common precancerous skin condition caused by long-term sun exposure. It appears as rough, scaly patches or lesions on sun-exposed areas such as the face, scalp, hands, and arms. While actinic keratosis itself is not cancerous, it has the potential to develop into squamous cell carcinoma, a type of skin cancer",
    'basal cell carcinoma': "Basal cell carcinoma (BCC) is the most common type of skin cancer. It typically develops on areas of the skin that are exposed to the sun, such as the face, ears, and neck. BCC usually appears as a shiny or pearly bump with a waxy texture, or as a pink, red, or flesh-colored patch. It may also present as a sore that does not heal or a scab that repeatedly forms and bleeds.",
    'dermatofibroma': "Dermatofibroma is a benign skin lesion that commonly occurs on the legs but can appear on other parts of the body as well. It usually presents as a firm, raised bump in the skin that ranges in color from pink to brown. Dermatofibromas are typically painless but may become tender or itchy. They are thought to develop in response to minor trauma or injury to the skin, such as insect bites or ingrown hairs",
    'nevus': "A nevus, commonly known as a mole, is a common skin growth composed of melanocytes, the pigment-producing cells in the skin. Nevi can vary in appearance, ranging from flat, pigmented spots to raised, dome-shaped lesions. They can be brown, black, or flesh-colored and may appear anywhere on the body. Most nevi are benign and do not require treatment unless they change in size, shape, color, or texture, which may indicate a potential risk of melanoma",
    'pigmented benign keratosis': "Pigmented benign keratosis, also known as seborrheic keratosis, is a common non-cancerous skin growth. It typically appears as a raised, wart-like growth with a waxy, stuck-on appearance. These growths can vary in color, ranging from tan to brown or black, and often develop on areas of the skin exposed to sunlight, such as the face, chest, back, or scalp.",
    'seborrheic keratosis': "Seborrheic keratosis is a wart-like lesions on the surface of the skin. These growths typically range in color from light tan to dark brown or black and can vary in size from a few millimeters to several centimeters in diameter. Seborrheic keratoses often have a waxy, stuck-on appearance and may appear singly or in clusters.",
    'squamous cell carcinoma': "Squamous cell carcinoma (SCC) is a type of skin cancer that originates in the squamous cells, which are flat, thin cells found in the outer layer of the skin. SCC often appears as a firm, red nodule or a flat lesion with a scaly or crusty surface. It can also present as a sore that does not heal or a growth that rapidly increases in size. SCC typically develops on areas of the body exposed to the sun, such as the face, ears, neck, scalp, arms, and hands, but it can also occur on mucous membranes and genitalia.",
    'vascular lesion': "A vascular lesion refers to an abnormal cluster of blood vessels that may appear on or just below the surface of the skin"
  }

  const treatment = {
    'melanoma': " It's crucial to seek medical attention promptly. Avoid touching or manipulating the lesion, and protect it from further sun exposure. Keep the area clean and covered with a sterile dressing until medical evaluation and treatment can be obtained",
    'actinic keratosis': "For immediate first aid for actinic keratosis lesions, gently cleanse the affected area with mild soap and water to remove any debris or dirt. Apply a moisturizing cream or ointment to soothe the skin and alleviate discomfort. Protect the area from further sun exposure by covering it with clothing or applying sunscreen",
    'basal cell carcinoma': "Basal cell carcinoma involves keeping the affected area clean and covered with a sterile bandage to protect it from infection. Avoid scratching or picking at the lesion, and apply a cold compress to help alleviate any discomfort or swelling",
    'dermatofibroma': "Keep the area clean and applying a clean, dry bandage if the lesion is irritated or bleeding. Avoid scratching or picking at the dermatofibroma to prevent further irritation or infection. If the lesion causes discomfort or pain, over-the-counter pain relievers or anti-inflammatory medications may help alleviate symptoms.",
    'nevus': "Keep the area clean and protected from irritation or injury. Avoid scratching or picking at the mole, and protect it from sun exposure by covering it with clothing or applying sunscreen. If there are any changes in the mole's appearance, such as bleeding, rapid growth, or irregular borders, seek medical evaluation promptly.",
    'pigmented benign keratosis': "Avoid further irritation or trauma to the lesion. Keep the affected area clean and dry, and avoid picking or scratching the lesion to prevent infection. Applying a gentle moisturizer or soothing cream may help alleviate any discomfort or itching associated with the lesion",
    'seborrheic keratosis': "Keep the affected area clean and dry to prevent irritation or infection. Avoid scratching or picking at the lesions to prevent further damage. If the lesions become irritated or inflamed, applying soothing topical creams or ointments may provide relief",
    'squamous cell carcinoma': "Immediate protection of the affected area from further sun exposure or trauma. Cover the lesion with a sterile, non-adherent dressing and seek prompt medical attention from a healthcare professional for evaluation and appropriate management, which may include surgical excision or other treatment modalities",
    'vascular lesion': "Apply direct pressure using a clean cloth or sterile gauze to control bleeding. Elevate the affected area if possible to help reduce blood flow. If bleeding is severe or persistent, seek medical attention promptly for further evaluation and treatment to prevent complications."
  }

  const handleClose = (e) => {
    setUploadStatus('')
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleImageChange = (event) => {
    setUploadStatus('')
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file))
  };

  const handleDownload = async() => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age)
    formData.append('gender', gender)
    formData.append('cls', uploadStatus)
    formData.append('desc', description[uploadStatus.toLowerCase()])
    formData.append('diag', treatment[uploadStatus.toLowerCase()])
    formData.append('image', image)
    const response = await axios.post('http://localhost:3003/api/users/generate-pdf', 
      // {
      //   "name": name,
      //   "age": age,
      //   "gender": gender,
      //   "cls": uploadStatus,
      //   "desc": description[uploadStatus.toLowerCase()],
      //   "diag": treatment[uploadStatus.toLowerCase()],
      // }
      formData
      , 
      { 
        responseType: 'blob' 
      });
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'output.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  const handleUpload = () => {
    if (name && age && gender && image) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('image', image);
      
      axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Upload successful:', response);
        setUploadStatus(response.data.predicted_class);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setUploadStatus('Upload failed');
      });
    } else {
      console.error('Please fill out all fields and select an image');
      setUploadStatus('Please fill out all fields and select an image');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Upload Image
              </h1>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleNameChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    id="age"
                    onChange={handleAgeChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <select value={gender} onChange={handleGenderChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Image
                  </label>
                  <input type="file" onChange={handleImageChange} className="block mb-4 w-full" />
                </div>
                <button
                  onClick={handleUpload}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Get Results
                </button>
                
            </div>
          </div>
          {uploadStatus !='' && 
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:bg-gray-900">
            <div className="p-1 space-y-1 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Result
                <i className="pi pi-download" style={{ fontSize: '1rem', paddingLeft:"10px", cursor: "pointer"}} onClick={handleDownload}></i>
                {/* <i className="pi pi-times"  style={{ fontSize: '1rem', paddingLeft:"240px", cursor: "pointer"}} onClick={handleClose}></i> */}
              </h1>
                <img src={imageUrl} className="inline mr-2" width="100px"/>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{uploadStatus}</h2>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {description[uploadStatus.toLowerCase()]}
                    </p>
                    <br></br>
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Diagnosis</h2>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {treatment[uploadStatus.toLowerCase()]}
                    </p>
                  </label>
                </div>
            </div>
          </div>
          }
    </div>

    
  );
};

export default About;
