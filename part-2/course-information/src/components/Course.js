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
      <Total sum={parts.reduce((total, part) => total + part.exercises, 0)} />
    </div>
  )
}

export default Course