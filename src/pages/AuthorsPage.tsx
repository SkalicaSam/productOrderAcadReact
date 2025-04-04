import React from "react";
import { useEffect, useState } from 'react'
import { Author } from "../types";
import { addAuthor, getAuthors } from "../services/api";


export const AuthorPage: React.FC = () => {
    const [ authors, setAuthors ] = useState<Author[]>([
        // {
        //   id: 1,
        //   name: 'Jakub'
        // },
        // {
        //   id: 2,
        //   name: 'Peter'
        // }
       ])
       const [ name, setName ] = useState('')
       const [ refresh, setRefresh] = useState(0)
    
       useEffect(() => {
          const fetchAuthors = async() => {
            const response =  await getAuthors()
            setAuthors(response.data)
        }
        fetchAuthors()
       }, [])

       const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('somt u')
        await addAuthor(name)
        setName('')
        setRefresh((prev) => prev +1 )

       }


       return (
        
        //   <h2>list of products</h2>
        //   <ul>
        //     <li>Author 1 </li>
        //     <li>Author 2  </li>
        //   </ul>
    <div key={refresh}>
        <h1>Authors</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <button type="submit">Add author</button>
        </form>

        <ul>
            {authors.map((author) => (
                <li key={author.id}>{author.name}</li>
            ))}
        </ul>

    </div>

       
    )
}