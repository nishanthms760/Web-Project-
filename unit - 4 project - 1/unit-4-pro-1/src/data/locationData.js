// Location intelligence dataset for dependent dropdowns, autocomplete, and pincode validation
export const LOCATION_DATA = {
  "Karnataka": {
    pincodePrefix: "56",
    districts: {
      "Bengaluru Urban": [
        "Bengaluru Central",
        "Indiranagar",
        "Koramangala",
        "Whitefield",
        "Jayanagar",
        "Electronic City",
        "HSR Layout",
        "Malleshwaram"
      ],
      "Mysuru": [
        "Mysuru City",
        "Gokulam",
        "Vijayanagar",
        "Jayalakshmipuram",
        "Kuvempunagar"
      ],
      "Dakshina Kannada": [
        "Mangaluru City",
        "Surathkal",
        "Kadri",
        "Bejai",
        "Ullal"
      ]
    }
  },
  "Maharashtra": {
    pincodePrefix: "40",
    districts: {
      "Mumbai": [
        "Mumbai South",
        "Andheri West",
        "Bandra",
        "Colaba",
        "Borivali",
        "Dadar",
        "Juhu"
      ],
      "Pune": [
        "Pune Central",
        "Shivaji Nagar",
        "Hinjawadi",
        "Kothrud",
        "Kalyani Nagar",
        "Viman Nagar"
      ],
      "Nagpur": [
        "Nagpur City",
        "Sitabuldi",
        "Dharampeth",
        "Civil Lines"
      ]
    }
  },
  "Tamil Nadu": {
    pincodePrefix: "60",
    districts: {
      "Chennai": [
        "Chennai Central",
        "Adyar",
        "Anna Nagar",
        "T. Nagar",
        "Velachery",
        "Mylapore",
        "Guindy"
      ],
      "Coimbatore": [
        "Coimbatore City",
        "RS Puram",
        "Gandhipuram",
        "Peelamedu",
        "Saravanampatti"
      ],
      "Madurai": [
        "Madurai Central",
        "KK Nagar",
        "Anna Nagar East",
        "Tallakulam"
      ]
    }
  },
  "Delhi NCR": {
    pincodePrefix: "11",
    districts: {
      "New Delhi": [
        "Connaught Place",
        "Chanakyapuri",
        "Barakhamba",
        "Golf Links"
      ],
      "South Delhi": [
        "Hauz Khas",
        "Saket",
        "Greater Kailash",
        "Vasant Kunj",
        "Def Colony"
      ],
      "Central Delhi": [
        "Karol Bagh",
        "Pahar Ganj",
        "Daryaganj",
        "Rajendra Nagar"
      ]
    }
  },
  "Telangana": {
    pincodePrefix: "50",
    districts: {
      "Hyderabad": [
        "Hyderabad Central",
        "Madhapur",
        "Gachibowli",
        "Banjara Hills",
        "Jubilee Hills",
        "HITEC City",
        "Kondapur"
      ],
      "Ranga Reddy": [
        "Shamshabad",
        "Rajendranagar",
        "Manikonda",
        "Serilingampally"
      ]
    }
  }
};

// Helper function to validate pincode with selected state
export function validatePincodeForState(pincode, stateName) {
  if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
    return { valid: false, message: "Pincode must be a 6-digit number" };
  }
  if (!stateName || !LOCATION_DATA[stateName]) {
    return { valid: true };
  }
  const expectedPrefix = LOCATION_DATA[stateName].pincodePrefix;
  if (!pincode.startsWith(expectedPrefix)) {
    return {
      valid: false,
      message: `Pincodes for ${stateName} typically start with '${expectedPrefix}' (e.g., ${expectedPrefix}0001).`
    };
  }
  return { valid: true };
}
