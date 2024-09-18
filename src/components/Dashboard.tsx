import { useCallback, useEffect, useState } from "react";
import { calculateOneCount, convertRowColumnToKey } from "../util/common";

export default function Dashboard(props: { input: number[][] }) {
    const { input } = props;
    const count = calculateOneCount(input);

    const [loading, setLoading] = useState<boolean>(false);
    const [track, setTrack] = useState<Map<string,boolean>>(new Map<string,boolean>());

    useEffect(() => {
        if (track.size == count) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    setTrack((prev) => {
                        let tempSet: Map<string,boolean> = new Map<string,boolean>(prev);
                        let lastKey=Array.from(tempSet.keys()).pop();
                        tempSet.delete(lastKey as string);
                        return tempSet;
                    })
                    if (i == (count - 1)) {
                        setLoading(false);
                    }
                }, 300 * i);
            }
        }
    }, [track]);

    const handleClick = useCallback((row: number, column: number) => {
        const tempValue = convertRowColumnToKey(row, column);
        if (track.has(tempValue)) {
            setTrack((prev) => {
                let tempSet: Map<string,boolean> = new Map<string,boolean>(prev);
                tempSet.delete(tempValue)
                return tempSet;
            })
        } else{
            if (track.size == (count-1)) {
                setLoading(true);
            }
            setTrack((prev) => {
                let tempSet: Map<string,boolean> = new Map<string,boolean>(prev);
                tempSet.set(tempValue,true);
                return tempSet;
            })
        }
    }, [track]);

    return <div className="flex flex-col gap-1">
        {input.map((value, row) => {
            return <div key={row} className="flex flex-row gap-1 gap-4">
                {value.map((item, column) => {
                    return <div key={convertRowColumnToKey(row, column)} onClick={() => {
                        handleClick(row, column);
                    }} className={`${item == 0 ? 'hide' : ''} ${track.has(convertRowColumnToKey(row, column))? 'bg' : ''} ${(loading || item == 0) ? 'disable-pointer' : ''} flex-1 box`}></div>
                })}
            </div>
        })}
    </div>
}