import { useEffect, useState } from 'react';
import { FSTracerFile } from '../lib/types';
import FileComponent from './Other/FSTracerFile';

export default function MostEditedFiles(props: any) {
  const [data, setData] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const timeframeEnd = props.timeframe.end.toDate();
      const timeframeStart = props.timeframe.start.toDate();
      timeframeStart.setHours(timeframeStart.getHours() - 12)
      const numDatapoints = 12;

      // TODO: Actually get the max edited files
      const { data: rawData } = await props.supabase
        .from('file')
        .select().gte('timestamp', timeframeStart.toISOString()).lte('timestamp', timeframeEnd.toISOString())
        .limit(numDatapoints);
      console.log(rawData)

      if (rawData.length === 0) {
        return;
      }

      console.log("RAWDATA xdd: ", rawData);

      setData(rawData);
    }
    fetchData()
  }, [props.timeframe])

  console.log("DATA: ", data);

  return (
    <ol>
      {data.map((file: FSTracerFile) => {
        return <li key={file.id}><FileComponent file={file} /></li>
      })}
    </ol>
  )
}
