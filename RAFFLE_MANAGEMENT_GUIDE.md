# Golden Cart Raffle Management Guide

This guide explains how to manage and update the Golden Cart Raffle website.

## Table of Contents
1. [Overview](#overview)
2. [Managing Contestants](#managing-contestants)
3. [Updating Draw Dates](#updating-draw-dates)
4. [Running a Raffle Draw](#running-a-raffle-draw)
5. [Managing Winners](#managing-winners)
6. [Changing the Admin Password](#changing-the-admin-password)
7. [Technical Details](#technical-details)

---

## Overview

The Golden Cart Raffle website allows you to:
- Display weekly raffles with contestants
- Run automated raffle draws with a 60-second countdown
- Track and display winners
- Delete winners (password-protected)
- Set countdown timers for upcoming raffles

---

## Managing Contestants

### Adding Contestants to a Week

Contestants are stored in JSON files located in the `src/data/` folder. Each week has its own file:

- Week 1: `src/data/week1.json`
- Week 2: `src/data/week2.json`
- Week 3: `src/data/week3.json`
- Week 4: `src/data/week4.json`
- Week 5: `src/data/week5.json`
- Week 6: `src/data/week6.json`
- Week 7: `src/data/week7.json`

### JSON File Format

Each contestant entry must follow this format:

```json
{
  "name": "John Doe",
  "supervisor": "Jane Smith",
  "department": "International Hosting"
}
```

### Example: Adding Contestants

To add contestants to Week 4, edit `src/data/week4.json`:

```json
[
  {
    "name": "Alice Johnson",
    "supervisor": "Bob Manager",
    "department": "Customer Support"
  },
  {
    "name": "Charlie Brown",
    "supervisor": "Diana Lead",
    "department": "Technical Support"
  },
  {
    "name": "Eve Davis",
    "supervisor": "Frank Supervisor",
    "department": "Sales Team"
  }
]
```

**Important:**
- Use proper JSON syntax (commas between entries, quotes around strings)
- The file must be a valid JSON array
- Each entry must have `name`, `supervisor`, and `department` fields

---

## Updating Draw Dates and Timers

Draw dates for upcoming raffles are defined in `src/App.tsx` in the `raffles` array. The countdown timer automatically displays on "Coming Soon" raffle cards.

### How Timers Work

The countdown timer:
- Automatically appears on raffle cards with `status: 'coming_soon'`
- Counts down to the `drawDate` specified in the raffle configuration
- Updates every second showing Days, Hours, Minutes, Seconds
- No separate timer configuration needed - it's automatic

### Location in Code

Open `src/App.tsx` and find the `useEffect` hook that creates the raffle data (around line 48-92):

```typescript
{
  week: 4,
  status: 'coming_soon',
  drawDate: new Date('2025-12-09'),  // ← Change this date
  contestants: [],
},
{
  week: 5,
  status: 'coming_soon',
  drawDate: new Date('2025-12-16'),  // ← Change this date
  contestants: [],
},
```

### Changing a Draw Date/Timer

To update when a raffle will occur:

1. Open `src/App.tsx`
2. Find the week you want to update in the raffles array
3. Update the `drawDate` in the format `YYYY-MM-DD`:

```typescript
drawDate: new Date('2025-12-15'),  // December 15, 2025
```

**Note:**
- Once the draw date is reached and contestants are added, a "Start Raffle Draw" button will automatically appear on the raffle card
- The timer automatically stops showing when the date is reached
- You can set dates far into the future (e.g., '2026-03-15')

### Example: Setting a Timer for 3 Months Away

```typescript
{
  week: 10,
  status: 'coming_soon',
  drawDate: new Date('2026-03-02'),  // 3 months from now
  contestants: week10Data,
}
```

---

## Running a Raffle Draw

### Automatic Draw Feature

1. **Prerequisites:**
   - Contestants must be added to the week's JSON file
   - For "Coming Soon" raffles, the draw date must be reached or passed

2. **Starting the Draw:**
   - Click the green "Start Raffle Draw" button on the raffle card
   - A modal will appear showing the draw in progress

3. **Draw Process:**
   - The draw runs for exactly 60 seconds
   - Contestant names cycle through rapidly, slowing down over time
   - After 60 seconds, a winner is randomly selected
   - Confetti animation automatically plays when the winner is announced

4. **Confirming the Winner:**
   - Review the winner details displayed
   - Click "Confirm Winner" to add them to the Winners Dashboard
   - The raffle status will change to "Completed"

5. **Canceling the Draw:**
   - Click the X button in the top-right corner to close the draw
   - The winner will NOT be saved if you close before confirming

---

## Managing Winners

### Viewing Winners

All confirmed winners are displayed in the "Winners Dashboard" at the top of the page, showing:
- Week number
- Winner name
- Supervisor
- Department
- Prize amount ($300)

### Updating a Winner Manually (Without Running Draw)

If you need to set or change a winner without running the automated draw:

1. **Open** `src/App.tsx`
2. **Find** the `winners` state initialization (around line 19-41)
3. **Add or modify** the winner entry in the default array:

```typescript
{
  name: 'Aakriti Arya',
  supervisor: 'Azharuddin MD_CDT',
  department: 'Outbound',
  week: 3,
  prizeAmount: 300,
}
```

**Complete Example:**
```typescript
return [
  {
    name: 'Syed Ala Uddin',
    supervisor: 'Kalyan',
    department: 'International Hosting',
    week: 1,
    prizeAmount: 300,
  },
  {
    name: 'Dhanraj S',
    supervisor: 'Srikanth Janga',
    department: 'International Messaging - Hosting',
    week: 2,
    prizeAmount: 300,
  },
  {
    name: 'Aakriti Arya',
    supervisor: 'Azharuddin MD_CDT',
    department: 'Outbound',
    week: 3,
    prizeAmount: 300,
  },
];
```

**Important:**
- Each winner must have: `name`, `supervisor`, `department`, `week`, and `prizeAmount`
- The `week` number must match an existing raffle week
- Winners are stored in localStorage after first load, so you may need to clear browser data to see changes
- Alternatively, use the "Delete Winner" feature and add the new winner

### Deleting a Winner

**This action requires a password.**

1. Click the red trash icon next to the winner you want to delete
2. A password prompt will appear
3. Enter the admin password (default: `InternationalMessaging@20`)
4. Click "Delete" to confirm

**Important:** Deleting a winner will:
- Remove them from the Winners Dashboard
- Change the raffle status back to "Active" (allowing a new draw)
- Persist the change in browser localStorage

---

## Changing the Admin Password

The admin password is stored in the browser's localStorage.

### Default Password
- `InternationalMessaging@20`

### Changing the Password

There are two ways to change the password:

#### Method 1: Using Browser Console

1. Open the website
2. Press F12 to open Developer Tools
3. Go to the "Console" tab
4. Type this command and press Enter:

```javascript
localStorage.setItem('raffle_admin_password', 'YourNewPassword');
```

5. Replace `YourNewPassword` with your desired password

#### Method 2: Programmatic Change

Add this code temporarily to `src/App.tsx` in the `useEffect` hook:

```typescript
useEffect(() => {
  localStorage.setItem('raffle_admin_password', 'YourNewPassword');
}, []);
```

Then remove it after the page loads once.

---

## Technical Details

### File Structure

```
src/
├── App.tsx                          # Main application logic
├── components/
│   ├── GoDaddyLogo.tsx             # Logo component
│   ├── WinnersDashboard.tsx        # Winners display and delete
│   ├── RaffleCard.tsx              # Individual raffle card
│   ├── RaffleDraw.tsx              # Draw modal with animation
│   ├── DeleteWinnerModal.tsx       # Password-protected delete
│   └── CountdownTimer.tsx          # Countdown for future draws
├── data/
│   ├── week1.json                  # Week 1 contestants
│   ├── week2.json                  # Week 2 contestants
│   ├── week3.json                  # Week 3 contestants
│   ├── week4.json                  # Week 4 contestants
│   ├── week5.json                  # Week 5 contestants
│   ├── week6.json                  # Week 6 contestants
│   └── week7.json                  # Week 7 contestants
└── types/
    └── raffle.ts                   # TypeScript type definitions
```

### Data Persistence

- **Winners:** Stored in browser localStorage under key `raffle_winners`
- **Password:** Stored in browser localStorage under key `raffle_admin_password`
- **Contestants:** Loaded from JSON files (not stored in localStorage)

### Adding More Weeks

To add Week 8, Week 9, etc.:

**Step 1: Create the JSON file**

Create a new JSON file in `src/data/` folder:
```bash
touch src/data/week8.json
```

Start with an empty array if no contestants yet:
```json
[]
```

**Step 2: Import the data in App.tsx**

Open `src/App.tsx` and add the import at the top (around line 9-12):
```typescript
import week8Data from './data/week8.json';
```

**Step 3: Add to the raffles array**

In the `useEffect` hook (around line 48-92), add a new raffle object before the closing bracket:
```typescript
{
  week: 8,
  status: 'coming_soon',
  drawDate: new Date('2026-01-06'),  // Change to your desired date
  contestants: week8Data,
}
```

**Important Notes:**
- The `week` number must match the JSON filename
- Use format `YYYY-MM-DD` for dates
- Set `status: 'coming_soon'` for future raffles
- The `contestants` field should reference the imported data
- Add a comma after the previous week's entry

### Raffle Status Types

- **`active`:** Has contestants, ready for draw
- **`completed`:** Winner has been selected
- **`coming_soon`:** Scheduled for future date

The status is automatically determined based on:
- Whether a winner exists for that week
- Whether contestants are present
- The draw date

---

## Customizing Appearance

### Changing the GoDaddy Logo Size

The logo size is controlled in `src/App.tsx` (around line 118):

```typescript
<GoDaddyLogo className="w-64 h-auto" />
```

- `w-48` = smaller logo
- `w-64` = current size (medium-large)
- `w-80` = larger logo

### Adjusting Gap Between Logo and Heading

In `src/App.tsx`, the gap is controlled by the `mb-X` class (around line 117):

```typescript
<div className="flex justify-center mb-3">
```

- `mb-2` = smaller gap
- `mb-3` = current gap
- `mb-6` = larger gap

### Styling the "Coming Soon" Badge

The badge styling is in `src/components/RaffleCard.tsx` (around line 43):

```typescript
<div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white px-4 py-1 rounded-full shadow-lg animate-pulse">
```

To change colors, modify the gradient classes:
- `from-amber-400` = starting color
- `via-orange-500` = middle color
- `to-red-500` = ending color

The `animate-pulse` class makes it gently pulse/fade in and out.

## Common Tasks Quick Reference

| Task | File to Edit | Action |
|------|-------------|--------|
| Add contestants | `src/data/weekX.json` | Add JSON objects with name, supervisor, department |
| Change draw date/timer | `src/App.tsx` | Update `drawDate: new Date('YYYY-MM-DD')` in raffles array |
| Update winner manually | `src/App.tsx` | Add/modify winner in default winners array (line 19-41) |
| Change password | Browser console | `localStorage.setItem('raffle_admin_password', 'NewPassword')` |
| Run a draw | Website UI | Click "Start Raffle Draw" button |
| Delete winner | Website UI | Click trash icon, enter password |
| Add new week | Multiple files | Create JSON, import in App.tsx, add to raffles array |
| Change logo size | `src/App.tsx` | Modify `w-XX` class on GoDaddyLogo component |
| Adjust logo gap | `src/App.tsx` | Modify `mb-X` class on logo container |
| Style Coming Soon badge | `src/components/RaffleCard.tsx` | Change gradient colors in badge classes |

---

## Troubleshooting

### "Start Raffle Draw" button doesn't appear
- **For active raffles:** Check that the JSON file has contestants
- **For coming soon raffles:** Ensure the draw date has passed

### Draw doesn't start
- Open browser console (F12) and check for JavaScript errors
- Verify the JSON file is valid (use a JSON validator online)

### Winner not saving
- Make sure you clicked "Confirm Winner" before closing the modal
- Check browser console for localStorage errors

### Can't delete winner
- Verify you're entering the correct password
- Check browser console for errors
- Try resetting the password using Method 1 above

### Contestants not showing
- Verify the JSON file path matches the import statement
- Check that the JSON is valid (no syntax errors)
- Make sure the week number in App.tsx matches the JSON filename

---

## Support

For technical issues or questions, contact the development team.

**Default Credentials:**
- Admin Password: `InternationalMessaging@20`

**Remember:** This data is stored locally in the browser. Clearing browser data will reset winners and password to defaults.
