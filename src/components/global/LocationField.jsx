/* eslint-disable react/prop-types */
import { ChevronsUpDown, MapPinIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { useJsApiLoader } from "@react-google-maps/api";
import Spinner from "./Spinner";

const mapKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const LocationField = ({
  form,
  label = "Location",
  placeholder = "Search location",
}) => {
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: mapKey || "",
    libraries,
    async: true,
  });

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <Spinner className={"w-5 h-5 text-textColor/40"} />;
  }

  if (isLoaded) {
    return <AutoComplete form={form} label={label} placeholder={placeholder} />;
  }
};

const AutoComplete = ({ form, label, placeholder }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(200);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  useEffect(() => {
    const updateButtonWidth = () => {
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    };

    updateButtonWidth();
    window.addEventListener("resize", updateButtonWidth);

    return () => {
      window.removeEventListener("resize", updateButtonWidth);
    };
  }, []);

  // Extract country, province, and city from geocode result
  const getLocationDetails = useCallback(async (address) => {
    try {
      const results = await getGeocode({ address });
      const addressComponents = results[0].address_components;

      const locationData = {
        country: "",
        province: "",
        city: "",
      };

      addressComponents.forEach((component) => {
        if (component.types.includes("country")) {
          locationData.country = component.long_name;
        } else if (component.types.includes("administrative_area_level_1")) {
          locationData.province = component.long_name;
        } else if (component.types.includes("locality")) {
          locationData.city = component.long_name;
        }
      });

      return locationData;
    } catch (error) {
      throw new Error("Error fetching location details: ", error);
    }
  }, []);

  // Handle location selection
  const handleSelectLocation = async (suggestion) => {
    const { description } = suggestion;
    setValue(description, false);
    clearSuggestions();
    setOpen(false);

    const locationDetails = await getLocationDetails(description);

    // Save location details in the form
    form.setValue("location", locationDetails);
  };

  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover className="w-full" open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full flex flex-row items-center justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                  ref={buttonRef}
                >
                  {field.value ? (
                    <p className="truncate">
                      {field?.value?.city
                        ? `${field.value.city}, ${field.value.province}, ${field.value.country}`
                        : ""}
                    </p>
                  ) : (
                    <p className="truncate text-input">{placeholder}</p>
                  )}

                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              style={{ width: `${buttonWidth}px` }}
              className="p-0"
            >
              <Command>
                <CommandInput
                  value={value}
                  onValueChange={(value) => {
                    setValue(value);
                  }}
                  disabled={!ready}
                />
                <CommandList>
                  {status === "OK" && data.length > 0 ? (
                    <CommandGroup>
                      {data.map((suggestion) => (
                        <CommandItem
                          key={suggestion.place_id}
                          value={suggestion.description}
                          onSelect={() => handleSelectLocation(suggestion)}
                        >
                          <div className="flex flex-row gap-4 justify-between w-full">
                            <div className="flex flex-row gap-2 text-textColor">
                              <MapPinIcon className="h-4 w-4 shrink-0" />
                              <p>{suggestion.description}</p>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ) : (
                    <CommandEmpty>No locations found.</CommandEmpty>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationField;
