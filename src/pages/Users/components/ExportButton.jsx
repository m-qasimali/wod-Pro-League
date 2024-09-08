import Spinner from "@/components/global/Spinner";
import { Button } from "@/components/ui/button";
import { exportUserDataFromDB } from "@/utils/DBFunctions2";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";
import xlsx from "json-as-xlsx";
import { useState } from "react";
import toast from "react-hot-toast";

const ExportButton = () => {
  const [loading, setLoading] = useState(false);

  const downloadExcelFile = async () => {
    try {
      const users = await exportUserDataFromDB();
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
              label: "Price",
              value: "price",
            },
            {
              label: "Discount Code Used 1",
              value: "discountCoupons",
            },
            {
              label: "Discount Code Used 2",
              value: "freeCoupons",
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
    } catch (error) {
      toast.error("Failed to export data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant="outline"
      className="rounded-full flex flex-row gap-2"
      onClick={downloadExcelFile}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ArchiveBoxArrowDownIcon className="w-4 h-4" />
          <span>Export</span>
        </>
      )}
    </Button>
  );
};

export default ExportButton;
