import React, { useEffect } from 'react'
import InputComp from '../../../../../Components/InputComp'
import TextareaComp from '../../../../../Components/TextAreaCom'
import Button from '../../../../../Components/Button'
import { useDispatch } from 'react-redux'
import { setActiveTab } from '../../../../../Features/Tab/TabSlice'
const General = ({initialValues, setInitialValues,nextTab}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(initialValues)
    }, [initialValues])


  return (
    <div className='w-full flex flex-col gap-4 items-start mt-4 justify-start'>
        <InputComp 
        value={initialValues.title}
        onChange={(e) => setInitialValues({ ...initialValues, title: e.target.value })}
        label="Title" placeholder="Title" />
        <InputComp 
        value={initialValues.clientName}
        onChange={(e) => setInitialValues({ ...initialValues, clientName: e.target.value })}
        label="Client Name" placeholder="Client Name" />
        <InputComp 
        value={initialValues.timeline}
        onChange={(e) => setInitialValues({ ...initialValues, timeline: e.target.value })}
        label="Timeline" placeholder="Timeline" />
        <InputComp 
        value={initialValues.publish_year}
        onChange={(e) => setInitialValues({ ...initialValues, publish_year: e.target.value })}
        label="Publish Year" placeholder="Publish Year" />
        <TextareaComp 
        value={initialValues.description}
        onChange={(e) => setInitialValues({ ...initialValues, description: e.target.value })}
        label="Description" placeholder="Description" />


        <div className='w-full flex items-center justify-end'>
            <Button onClick={() => dispatch(setActiveTab(nextTab))}>
                İleri
            </Button>
        </div>
    </div>
  )
}

export default General