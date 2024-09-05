import { Button } from "@/components/ui/button";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";
import xlsx from "json-as-xlsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ExportButton = () => {
  const { loading, users } = useSelector((state) => state.user);

  const downloadExcelFile = () => {
    const data = [
      {
        sheet: "Users",
        columns: [
          {
            label: "Name",
            value: "firstName",
          },
          {
            label: "Last Name",
            value: "lastName",
          },
          {
            label: "Category",
            value: "category",
          },
          {
            label: "Genre",
            value: "gender",
          },

          {
            label: "Team Name",
            value: "teamName",
          },
          {
            label: "Registration Date",
            value: "createdAt",
          },
          {
            label: "Birth Date",
            value: "dob",
          },
          {
            label: "Email",
            value: "email",
          },

          {
            label: "Phone Number",
            value: "phone",
          },
          {
            label: "Address",
            value: "street",
          },
          {
            label: "Address Number",
            value: "streetNumber",
          },
          {
            label: "Zip Code",
            value: "postalCode",
          },

          {
            label: "City",
            value: "city",
          },
          {
            label: "Province",
            value: "province",
          },
          {
            label: "Country",
            value: "country",
          },
          {
            label: "Box Number",
            value: "boxNumber",
          },
          {
            label: "Discount Code Used 1",
            value: "discount",
          },
          {
            label: "Discount Code Used 2",
            value: "boxNumber",
          },
        ],
        content: [...users],
      },
    ];
    let settings = {
      fileName: "WodPro_league_users_data",
      extraLength: 3,
      writeMode: "writeFile",
      writeOptions: {},
      RTL: false,
    };
    xlsx(data, settings, () => {
      toast.success("users download successfully");
    });
  };
  return (
    <Button
      disabled={loading}
      variant="outline"
      className="rounded-full flex flex-row gap-2"
      onClick={downloadExcelFile}
    >
      <ArchiveBoxArrowDownIcon className="w-4 h-4" />
      <span>Export</span>
    </Button>
  );
};

export default ExportButton;
