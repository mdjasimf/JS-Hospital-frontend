import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import { DrawerItem } from "@/types";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
};

const SideBarItem = ({ item }: IProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathName = usePathname();
  return (
    <Link href={linkPath}>
      <ListItem
        disablePadding
        sx={{
          position: "relative",
          // Styles for the active item
          ...(pathName === linkPath
            ? {
                background: "linear-gradient(45deg, #e0f7fa, #00acc1)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "5px",
                  background: "linear-gradient(to bottom, blue, green)", // Gradient border for active item
                },
                "& svg": {
                  color: "green",
                },
              }
            : {
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Background color on hover for non-active items
                },
                "&:hover svg": {
                  color: "green", // Icon color change on hover for non-active items
                },
              }),
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideBarItem;
