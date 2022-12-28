import {useState, useEffect} from 'react'

const baseURL = 'http://localhost:3001'
export default function HomePage() {
    const [list, setList] = useState([])
    const [questions, setQuestions] = useState([])
    const [applications, setApplications] = useState([])

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(`${baseURL}/candidates`)
            .then((res) => res.json())
            .then((data) => {
                setList(data)
                setLoading(false)
            })
            .catch(e => {
                setError(e)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        fetch(`${baseURL}/applications`)
            .then((res) => res.json())
            .then((data) => {
                setApplications(data)
            })
    }, [])

    useEffect(() => {
        fetch(`${baseURL}/questions`)
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data)
            })
    }, [])


    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error...</p>

    return (
        <section className="c-homepage">
            {renderList()}
        </section>
    )


    function renderList() {
        return (
            list.map(candidate => {
                return (
                    <div key={candidate.id}>
                        {candidate.name}
                        <div style={{marginLeft: '15px'}}>
                            {renderQuestions(candidate.id)}
                        </div>
                    </div>
                )
            })
        )
    }


    function renderQuestions(candidateId) {
        return questions.map(question => {
            return <>
                <h5>{question.question}</h5>
                <div>{renderApplications(question.id, candidateId)}</div>
            </>
        })
    }

    function renderApplications(questionId, candidateId) {
        return applications.map(application => {
            if (application.questionId !== questionId) return
            if (application.candidateId === candidateId) {
                return (<>
                    <h1 style={{marginLeft: "15px"}}>{application.response}</h1>
                    <h3 style={{marginLeft: "15px"}}>{application.comment}</h3>
                </>)
            }
        })
    }
}
