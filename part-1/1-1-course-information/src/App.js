const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header courseName={course}/>
      <Content name1 = {part1} name2 = {part2} name3 = {part3} ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
      <Total ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
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
      <Part1 name1 = {props.name1} ex1 = {props.ex1} />
      <Part2 name2 = {props.name2} ex2 = {props.ex2} />
      <Part3 name3 = {props.name3} ex3 = {props.ex3} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
    </>
    
  )
}

  

export default App
