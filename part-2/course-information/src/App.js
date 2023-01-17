const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part  key={part.name} part={part} />)}
  </>

const Course = ({course, parts}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      
    </div>
  )
}

// <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Course course={course} parts={parts} />
    </div>
  )
}

export default App