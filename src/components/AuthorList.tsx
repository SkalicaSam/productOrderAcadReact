const AuthorList: React.FC = () => {
    const [ authors, setAuthors ] = useState<Author[]>([
        // {id: 1,name: 'Jakub' },
        // {id: 2,name: 'Peter'}
       ])

       useEffect(() => {
        const fetchAuthors = async() => {
          const response =  await getAuthors()
          setAuthors(response.data)
      }
      fetchAuthors()
     }, [])




}

export default AuthorList