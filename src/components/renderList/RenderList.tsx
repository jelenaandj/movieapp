
type Props = {
  items:string[] | object[] | void,
  resourceName:string,
  itemComponent:any,
  classTxt?:string,
  setGenres?:any
}

const RenderList = (props: Props) => {
const {items,resourceName,itemComponent:ItemComponent,classTxt,setGenres}=props

return (
    <div className={classTxt}>
      {
        items?.map((item,i)=>{
          return <ItemComponent setGenres={setGenres} key={i} {...{ [resourceName]: item}} />
        })
      }
    </div>
  )
}

export default RenderList


