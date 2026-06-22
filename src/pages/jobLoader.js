import { supabase } from '../utils/supabase';

const jobLoader = async ({ params }) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', params.id)
    .single(); 

  if (error) throw new Error('Job not found');

  return {
    id:          data.id,
    title:       data.title,
    type:        data.type,
    location:    data.location,
    description: data.description,
    salary:      data.salary,
    minimumScoreThreshold: data.minimum_score_threshold,
    company: {
      name:         data.company_name,
      description:  data.company_description,
      contactEmail: data.contact_email,
      contactPhone: data.contact_phone,
    }
  };
};

export default jobLoader;
