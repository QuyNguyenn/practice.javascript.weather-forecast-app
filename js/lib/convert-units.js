export default function Convert() {
    const unitGroup =  {
            'C': 'temperature', 
            'K': 'temperature', 
            'F': 'temperature',
            'hPa': 'pressure', 
            'mBar': 'pressure',
            'psi': 'pressure',
            'm/s': 'speed', 
            'km/h': 'speed', 
            'm/h': 'speed', 
            'ft/s': 'speed'
    }

    const convertionFunction = {
        temperature: {
            'C': [ value => value, value => value ],
            'K':  [ value => value - 273.15, value => value + 273.15 ],
            'F': [ value => (value - 32) * 5 / 9, value => 1.8 * value + 32 ]
        },
        pressure: {
            'hPa': [ value => value, value => value ],
            'mBar': [ value => value, value => value ],
            'psi': [ value => value * 68.9475729, value => value / 68.9475729]
        },
        speed: { 
            'm/s': [ value => value, value => value ],
            'km/h': [ value => value * 3.6, value => value * 3.6 ],
            'm/h': [ value => value / 3600, value => value * 3600 ],
            'ft/s': [ value => value * 0.3048 / 3600, value => value * 3600 / 0.3048 ],
            'mph': [ value => value * 0.44704, value => value / 0.44704 ]
        }
    }

    return (value) => ({

        from: (unitFrom) => ({

            to: (unitTo) => {

                let unitFromGroup = unitGroup[unitTo];

                let unitToGroup = unitGroup[unitFrom];

                if (!unitFromGroup || !unitToGroup || unitFromGroup != unitToGroup) {
                    return undefined;
                }

                const tempValue = convertionFunction[unitFromGroup][unitFrom][0](value);
                const result = convertionFunction[unitToGroup][unitTo][1](tempValue);

                return result
            }
        })
    })
}