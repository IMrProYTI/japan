import { ref, Ref } from "vue";
import supabase from "../../supabase";

const isValidKey: Ref<boolean | null> = ref(null);

async function validateKey(
  participant_id: number,
  key: string
): Promise<boolean> {
  if (isValidKey.value) return isValidKey.value;

	const { data, error } = await supabase.from('judge').select('participant').eq('key', key).single();
  const result = !!(data && data.participant === participant_id && error === null);

  isValidKey.value = result;
  return result;
};

interface IFilter {
  title: boolean;
  description: boolean;
  status: boolean;
  actions: boolean;
};

const filter: Ref<IFilter> = ref({
  title: true,
  description: true,
  status: true,
  actions: true
});


export type { IFilter };
export { filter, isValidKey, validateKey };