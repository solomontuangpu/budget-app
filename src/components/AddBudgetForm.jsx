// react import
import { useEffect, useRef } from "react";

// rrd import
import { useFetcher } from "react-router-dom";

// icon import
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

const AddBudgetForm = () => {

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const inputRef = useRef();
  
  useEffect(()=> {
      if(!isSubmitting){
          formRef.current.reset();
          inputRef.current.focus();
      }
  },[isSubmitting])

  return (
    <div className='form-wrapper'>
      <h2 className='h3'>Create Budget</h2>
      <fetcher.Form ref={formRef} method='post' className='grid-sm'>
        <div className='grid-xs'>
          <label htmlFor='newBudget'>Budget Name</label>
          <input
            type='text'
            name='newBudget'
            id='newBudget'
            placeholder='e.g., groceries'
            ref={inputRef}
            required
          />
        </div>
        <div className='grid-xs'>
          <label htmlFor='newBudgetAmount'>Amount</label>
          <input
            type='number'
            step='0.01'
            name='newBudgetAmount'
            id='newBudgetAmount'
            placeholder='e.g., $350'
            inputMode='decimal'
            required
          />
        </div>
        <input type='hidden' name='_action' value='createBudget' />
        <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
