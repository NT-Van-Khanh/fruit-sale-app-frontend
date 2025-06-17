import { Range } from 'react-range';

const PriceRange = ({ values, setValues, MIN = 0, MAX = 5000000, STEP = 50000 }) =>{
    const trackWidth = MAX - MIN;
    const leftPercent = ((values[0] - MIN) / trackWidth) * 100;
    const rightPercent = ((values[1] - MIN) / trackWidth) * 100;

    return (
        <div className="flex flex-col gap-2 mx-2">
        <div className="flex justify-between text-sm text-green-700">
          <span className="text-yellow-600 tb">Từ: {values[0].toLocaleString()}₫</span>
          <span className="text-yellow-600">Đến: {values[1].toLocaleString()}₫</span>
        </div>
            <Range
                step={STEP}
                min={MIN}
                max={MAX}
                values={values}
                onChange={(vals) => setValues(vals)}
                renderTrack={({ props, children }) => {
                const { key, ...rest } = props;


                return (
                    <div
                    key={key}
                    {...rest}
                    className="relative w-full h-2 rounded bg-gray-300">
                    <div
                        className="absolute h-2 bg-green-600 rounded"
                        style={{
                        left: `${leftPercent}%`,
                        width: `${rightPercent - leftPercent}%`,
                        }}
                    />
                    {children}
                    </div>
                );
                }}

                renderThumb={({ props }) => {
                    const { key, ...rest } = props;
                    return (
                    <div
                        key={key}
                        {...rest}
                        className="h-5 w-5 rounded-full bg-green-600 shadow"
                    />
                );
                }}
            />
       </div>
        
    );
};

export default PriceRange;