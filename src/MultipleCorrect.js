import {Question} from "../AtomicComponent/QuestionAndDescription"
import {useDispatch, useSelector} from "react-redux";
export function MultipleCorrect(props){

    const multipleCorrect=useSelector((state)=>state.MultipleCorrect);
    var selected=multipleCorrect.selected;
    var selectedOption=multipleCorrect.selectedOption;
    const dispatch=useDispatch();

    var selectedOptions=new Array(props.options.length);
    selectedOptions.fill(false);


    function changeOption(event){

        var index=event.target.id;
        var ans=[];
        var select=[];

        if(index==="clearSelection")
        {
            if(props.required==="1")
            {
                let parent;
                parent=event.target.parentNode;
                parent.style.border="2px solid red";
            }
           select.fill(false);
           dispatch(setSelectedOption(select));
           dispatch(setSelected(-1));
           dispatch(props.handler(ans));
           return;
        }

        if(selectedOption[index]===true)
        {
            
           select=[...selectedOption];
           select[index]=false;
           dispatch(setSelectedOption(select));
           dispatch(setSelected(selected-1));
        }
        else
        {
            select=[...selectedOption];
            select[index]=true;
            dispatch(setSelectedOption(select));
            dispatch(setSelected(selected+1));
        }
        
        for(var i=0;i<props.options.length;i++)
        {
            if(select[i])
            {
                ans.push(props.options[i]);
            }
        }
        if(props.required==="1")
        {
            if(ans.length===0)
            {
                let parent;
                parent=event.target.parentNode;
                parent.parentNode.style.border="2px solid red";

            }
            else
            {
                let parent;
                parent=event.target.parentNode;
                parent.parentNode.style.border="1.5px solid black";
            }
        }
        dispatch(props.handler(ans));


    }
    return(
        <div id="MultipleCorrectContainer">

            <Question question={props.question} required={props.required} isDespcription={props.isDespcription} description={props.description}/>

            {props.options.map((x,i)=>{
                return(
                    <div key={i} style={{display:"flex",padding:"10px",alignItems:"center"}}>
                        <input id={i} type="checkbox" onChange={changeOption} checked={selectedOption[i]}></input>
                        <label style={{fontSize:"1.2vw"}}>{x}</label>
                    </div>
                );
            })}
            {selected!==-1 && <button id="clearSelection" onClick={changeOption} style={{marginLeft:"40vw",height:"3vh",fontSize:"1.5vh"}}>Clear Selection</button>}


        </div>
    );

}