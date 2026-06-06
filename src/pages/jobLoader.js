// src/pages/jobLoader.js
import { supabase } from '../utils/supabase';

const jobLoader = async ({ params }) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', params.id)
    .single(); // returns one object, not an array

  // #region agent log
  fetch('http://127.0.0.1:7344/ingest/f404edb9-b305-43de-9ba7-568fd646dc90',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2b480a'},body:JSON.stringify({sessionId:'2b480a',runId:'pre-fix',hypothesisId:'C',location:'jobLoader.js:query',message:'job loader query result',data:{jobId:params.id,hasError:!!error,errorCode:error?.code??null,errorMessage:error?.message??null,hasData:!!data},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  if (error) throw new Error('Job not found');

  // reshape to nested format
  return {
    id:          data.id,
    title:       data.title,
    type:        data.type,
    location:    data.location,
    description: data.description,
    salary:      data.salary,
    company: {
      name:         data.company_name,
      description:  data.company_description,
      contactEmail: data.contact_email,
      contactPhone: data.contact_phone,
    }
  };
};

export default jobLoader;
