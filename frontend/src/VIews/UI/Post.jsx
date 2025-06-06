import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import "/src/Styles/Post.scss"
import Axios from 'axios'

const Post = ({Close}) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null)

    const Category = useRef()
    const Title = useRef()
    const Description = useRef()
    const File = useRef()

    useEffect(() => {
        if(!image) return
        const data = new FormData()
        data.append('file', image)
        
        
    })
    
    const handlePost = () => {
        setImage(null)
        navigate('/')
    }

  return (
    <div onClick={Close} className='overlay'>
        <section className='post'>
            <main className='form' onClick={e => e.stopPropagation()}>
                <div className='upload'>
                    <label htmlFor="file">
                        <h1>Upload</h1>
                    </label>
                    <input type="file" id='file' name='file' ref={File} onChange={e => setImage(e.target.files[0])}/>
                </div>
                <input type="text"  placeholder='Title' ref={Title} />
                <select name="" id="" placeholder='Category' ref={Category}>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                </select>
                <textarea name="" id="" placeholder='Description' ref={Description}></textarea>
                <div>
                    <button onClick={handlePost}>Post</button>
                    <button onClick={Close} className='cancel'>Cancel</button>
                </div>
            </main>
        </section>
    </div>
  )
}

export default Post