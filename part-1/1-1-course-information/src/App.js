const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <>
      <Header courseName = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </>
  )
}


const Header = (props) => {
    return (
      <>
        <h1>{props.courseName}</h1>
      </>
      
    )
}

const Part1 = (props) => {
  return (
    <>
      <p>
        {props.name1} {props.ex1}
      </p>
    </>
  )
}

const Part2 = (props) => {
  return (
    <>
      <p>
        {props.name2} {props.ex2}
      </p>
    </>
  )
}

const Part3 = (props) => {
  return (
    <>
      <p>
        {props.name3} {props.ex3}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part1 name1 = {props.parts[0].name} ex1 = {props.parts[0].exercises} />
      <Part2 name2 = {props.parts[1].name} ex2 = {props.parts[1].exercises} />
      <Part3 name3 = {props.parts[2].name} ex3 = {props.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
    
  )
}

  

export default App
