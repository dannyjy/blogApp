import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import "/src/Styles/Post.scss"
import { motion, AnimatePresence, easeInOut} from "framer-motion";
import Axios from 'axios'

const Post = ({Close}) => {

    const navigate = useNavigate();
    const [uploadImage, setUploadImage] = useState(null);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {

            const reader = new FileReader()

            reader.onload = () => {
                if (reader.result !== null) {
                setUploadImage(reader.result);
                }
            }
            reader.readAsDataURL(files[0])
        }
    };
    
    useEffect(() => {
        if(!uploadImage) return
        const data = new FormData()
        data.append('file', uploadImage)
    })
    
    const Category = useRef();
    const Title = useRef();
    const Description = useRef();
    const File = useRef();
    
    const handlePost = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:5009/post?id=4",
            {
                Title: Title.current.value,
                Category: Category.current.value, 
                Description: Description.current.value, 
                Image:  uploadImage
            })
            .then((response) => {
                alert("Blog Posted Successfully")
                Close()
                navigate("/")
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

  return (
    <AnimatePresence>
        <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0}} transition={{duration:0.9, ease:easeInOut}} className='floating'>
            <div className='post'>
                <form className='form' onClick={e => e.stopPropagation()} onSubmit={handlePost}>
                    <div className='uploadholder'>
                        <label htmlFor="file" className='upload' 
                        style={{
                            backgroundImage: uploadImage ? `url(${uploadImage})` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                            }}
                            >
                            <h1>Upload</h1>
                        </label>
                        <input type="file" id='file' name='file' ref={File} onChange={handleImageUpload}/>
                    </div>
                    <input type="text"  placeholder='Title' ref={Title} />
                    <select name="" id="Category" placeholder='Category' ref={Category}>
                        <option value="Category">Categories</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Design">Design</option>
                        <option value="Python">Python</option>
                        <option value="Teams">Teams</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="C-SHARP">C-SHARP</option>
                    </select>
                    <textarea name="" id="Description" placeholder='Description' ref={Description}></textarea>
                    <div className='btns'>
                        <button type='button' onClick={handlePost}>Post</button>
                        <button type='button' onClick={() => { if (confirm("Are you sure? You want to cancel")) Close(); }} className='cancel'>Cancel</button>
                    </div>
                </form>
            </div>
        </motion.div>
    </AnimatePresence>
  )
}

export default Post