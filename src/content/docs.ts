export interface DocContentBlock {
  type: 'heading' | 'paragraph' | 'code';
  text: string;
}

export interface DocArticle {
  id: string;
  slug: string;
  title: string;
  heading: string;
  groupId: string;
  groupLabel: string;
  description: string;
  blocks: DocContentBlock[];
  previousSlug: string | null;
  nextSlug: string | null;
  order: number;
}

export const docGroups = [
  { id: 'getting-started', label: 'Getting Started', accent: 'purple' as const, firstSlug: 'account' },
  { id: 'integrations', label: 'Integrations', accent: 'orange' as const, firstSlug: 'integrations' },
  { id: 'collaboration', label: 'Collaboration', accent: 'pink' as const, firstSlug: 'inviting-team-members' },
  { id: 'advanced-features', label: 'Advanced features', accent: 'lime' as const, firstSlug: 'task-automation' },
];

export const docArticles: DocArticle[] = [
  {
    "id": "account",
    "slug": "account",
    "title": "Account",
    "heading": "Account",
    "groupId": "getting-started",
    "groupLabel": "Getting Started",
    "description": "Getting started with TodoFusion is a breeze. This section guides you through the process of creating your TodoFusion account, ensuring you're up and running in no time.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Getting started with TodoFusion is a breeze. This section guides you through the process of creating your TodoFusion account, ensuring you're up and running in no time."
      },
      {
        "type": "heading",
        "text": "Account Settings"
      },
      {
        "type": "paragraph",
        "text": "To access and modify your account settings, follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion Management account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Click on your profile picture or username in the top right corner of the dashboard to access the account menu."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Select \"Account Settings\" from the dropdown menu."
      },
      {
        "type": "paragraph",
        "text": "Here, you can update your personal information, security settings, notification preferences, and more."
      },
      {
        "type": "heading",
        "text": "Changing Your Password"
      },
      {
        "type": "paragraph",
        "text": "If you wish to change your TodoFusion password, you can do so by following these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: In the \"Account Settings\" page, navigate to the \"Security\" section."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Find the \"Change Password\" option and click it."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Enter your current password and your new password in the provided fields."
      },
      {
        "type": "code",
        "text": "// Example code for changing your TodoFusion password\nPATCH /api/account/change-password\n{\n  \"current_password\": \"your_current_password\",\n  \"new_password\": \"your_new_password\"\n}"
      },
      {
        "type": "paragraph",
        "text": "Step 4: Click the \"Save Changes\" button to update your password."
      },
      {
        "type": "heading",
        "text": "Managing Notifications"
      },
      {
        "type": "paragraph",
        "text": "TodoFusion allows you to customize your notification preferences. To do so, follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: In the \"Account Settings\" page, navigate to the \"Notifications\" section."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Adjust your notification settings according to your preferences."
      },
      {
        "type": "heading",
        "text": "Deleting Your Account"
      },
      {
        "type": "paragraph",
        "text": "Should you decide to delete your TodoFusion account, follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: In the \"Account Settings\" page, scroll down to the \"Account Deletion\" section."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Click the \"Delete Account\" button."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Follow the on-screen instructions to confirm and complete the account deletion process."
      },
      {
        "type": "paragraph",
        "text": "By following these steps, you can effectively manage and customize your TodoFusion account to suit your needs and preferences."
      }
    ],
    "previousSlug": null,
    "nextSlug": "dashboard",
    "order": 1
  },
  {
    "id": "dashboard",
    "slug": "dashboard",
    "title": "Dashboard",
    "heading": "Dashboard",
    "groupId": "getting-started",
    "groupLabel": "Getting Started",
    "description": "The TodoFusion dashboard is your central hub for managing tasks, teams, and projects. In this section, we'll provide an overview of the TodoFusion dashboard and explain how to perform key actions.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The TodoFusion dashboard is your central hub for managing tasks, teams, and projects. In this section, we'll provide an overview of the TodoFusion dashboard and explain how to perform key actions."
      },
      {
        "type": "heading",
        "text": "Dashboard Overview"
      },
      {
        "type": "paragraph",
        "text": "When you log in to TodoFusion Management, you'll land on your dashboard, which is divided into several sections:"
      },
      {
        "type": "paragraph",
        "text": "Task List: This section displays your tasks, including their names, due dates, and priority levels."
      },
      {
        "type": "paragraph",
        "text": "Teams: Here, you can see your team members and access team-specific features."
      },
      {
        "type": "paragraph",
        "text": "Analytics: View reports and analytics to track your productivity and task completion."
      },
      {
        "type": "heading",
        "text": "Loading Tasks"
      },
      {
        "type": "paragraph",
        "text": "To load and view your tasks on the dashboard, you can use the following code example if you're integrating TodoFusion Management into your application:"
      },
      {
        "type": "code",
        "text": "// Example code to load tasks from the TodoFusion Management API\nGET /api/dashboard/tasks\n\nMake a GET request to the /api/dashboard/tasks endpoint, and the API will return a list of tasks associated with your account. You can then use this data to display tasks on the dashboard in your application.\n\n\n\n\nNavigating the Dashboard\n\nTo navigate the dashboard effectively, use the following tips:\n\nClick on a task to view its details and make updates.\n\nUse the search bar to find specific tasks or projects quickly.\n\nFilter tasks based on priority, due date, or team.\n\nBy using these features and code examples, you can make the most of your TodoFusion dashboard and stay organized and productive."
      }
    ],
    "previousSlug": "account",
    "nextSlug": "managing-tasks",
    "order": 2
  },
  {
    "id": "managing-tasks",
    "slug": "managing-tasks",
    "title": "Managing Tasks",
    "heading": "Managing Tasks",
    "groupId": "getting-started",
    "groupLabel": "Getting Started",
    "description": "In TodoFusion Management, you can efficiently create, update, and track your tasks. This section will guide you through the process of managing tasks effectively.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "In TodoFusion Management, you can efficiently create, update, and track your tasks. This section will guide you through the process of managing tasks effectively."
      },
      {
        "type": "heading",
        "text": "Creating a Task"
      },
      {
        "type": "paragraph",
        "text": "To create a new task, follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion Management account and navigate to your dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Click the \"+ New Task\" button or a similar option to initiate task creation."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Fill in the task details, including the task name, description, due date, and priority level."
      },
      {
        "type": "code",
        "text": "// Example code for creating a new task using TodoFusion Management API\nPOST /api/tasks\n{\n  \"name\": \"Complete Project Proposal\",\n  \"description\": \"Draft and finalize the project proposal for Q3.\",\n  \"due_date\": \"2023-10-15\",\n  \"priority\": \"High\"\n}"
      },
      {
        "type": "paragraph",
        "text": "Step 4: Assign the task to team members if needed."
      },
      {
        "type": "paragraph",
        "text": "Step 5: Save or submit the task."
      },
      {
        "type": "heading",
        "text": "Updating a Task"
      },
      {
        "type": "paragraph",
        "text": "To update an existing task, use the following steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Navigate to the task you wish to update on your dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Click on the task to open its details."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Make the necessary changes to the task details."
      },
      {
        "type": "code",
        "text": "// Example code for updating a task using TodoFusion Management API\nPATCH /api/tasks/{task_id}\n{\n  \"description\": \"Finalize and send the project proposal for approval.\"\n}"
      },
      {
        "type": "heading",
        "text": "Marking a Task as Complete"
      },
      {
        "type": "paragraph",
        "text": "When you've completed a task, follow these steps to mark it as complete:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Open the task you've finished from your dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Locate the \"Mark as Complete\" button or similar option."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Click the button to mark the task as complete."
      },
      {
        "type": "code",
        "text": "// Example code for marking a task as complete using Taskify Management API\nPOST /api/tasks/{task_id}/complete\n\nBy following these steps, you can efficiently manage your tasks and keep track of your progress in TodoFusion Management."
      }
    ],
    "previousSlug": "dashboard",
    "nextSlug": "integrations",
    "order": 3
  },
  {
    "id": "integrations",
    "slug": "integrations",
    "title": "Todo Integrations",
    "heading": "Todo Integrations",
    "groupId": "integrations",
    "groupLabel": "Integrations",
    "description": "TodoFusion Management provides the flexibility to integrate with various external tools and services, allowing you to streamline your workflow and enhance your task management experience. In this section, we'll explore how to set up and manage integrations with Taskify.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "TodoFusion Management provides the flexibility to integrate with various external tools and services, allowing you to streamline your workflow and enhance your task management experience. In this section, we'll explore how to set up and manage integrations with Taskify."
      },
      {
        "type": "heading",
        "text": "Available Integrations"
      },
      {
        "type": "paragraph",
        "text": "TodoFusion offers integrations with a wide range of tools and services, including but not limited to:"
      },
      {
        "type": "paragraph",
        "text": "Slack: Streamline communication by connecting TodoFusion with your Slack workspace."
      },
      {
        "type": "paragraph",
        "text": "Google Calendar: Sync your tasks and due dates with Google Calendar for better time management."
      },
      {
        "type": "paragraph",
        "text": "Trello: Bridge the gap between TodoFusion and Trello to manage tasks seamlessly."
      },
      {
        "type": "heading",
        "text": "Setting Up an Integration"
      },
      {
        "type": "paragraph",
        "text": "To set up an integration with an external service, you'll typically need to generate API tokens or access keys. Below is an example of how to set up a Slack integration with TodoFusion:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Navigate to the \"Integrations\" or \"Settings\" section, and choose \"Slack Integration.\""
      },
      {
        "type": "paragraph",
        "text": "Step 3: Click on the \"Connect to Slack\" button to start the integration process."
      },
      {
        "type": "paragraph",
        "text": "Step 4: Follow the on-screen instructions to log in to your Slack workspace and authorize TodoFusion's access."
      },
      {
        "type": "paragraph",
        "text": "Step 5: Once authorized, you will receive an API token that you can use to connect TodoFusion and Slack."
      },
      {
        "type": "code",
        "text": "// Example code for using an API token to set up a Slack integration with TodoFusion\nPOST /api/integrations/slack\n{\n  \"api_token\": \"your_slack_api_token\"\n}"
      },
      {
        "type": "paragraph",
        "text": "By following these steps, you can easily set up and manage integrations with external services to enhance your task management capabilities in TodoFusion."
      }
    ],
    "previousSlug": "managing-tasks",
    "nextSlug": "set-up-integrations",
    "order": 4
  },
  {
    "id": "set-up-integrations",
    "slug": "set-up-integrations",
    "title": "Set Up Integrations",
    "heading": "Set Up Integrations",
    "groupId": "integrations",
    "groupLabel": "Integrations",
    "description": "TodoFusion offers seamless integration with various external tools and services to enhance your workflow and task management experience. In this section, we'll guide you through the process of setting up integrations with TodoFusion.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "TodoFusion offers seamless integration with various external tools and services to enhance your workflow and task management experience. In this section, we'll guide you through the process of setting up integrations with TodoFusion."
      },
      {
        "type": "heading",
        "text": "Supported Integrations"
      },
      {
        "type": "paragraph",
        "text": "TodoFusion supports integrations with a variety of popular tools and services, allowing you to connect your tasks and projects with your favorite apps. Some of our supported integrations include:"
      },
      {
        "type": "paragraph",
        "text": "Slack: Integrate with Slack to receive task notifications and updates in your Slack channels."
      },
      {
        "type": "paragraph",
        "text": "Google Calendar: Sync your TodoFusion tasks and deadlines with Google Calendar for better time management."
      },
      {
        "type": "paragraph",
        "text": "Trello: Connect TodoFusion with Trello to manage tasks seamlessly across both platforms."
      },
      {
        "type": "heading",
        "text": "Setting Up an Integration"
      },
      {
        "type": "paragraph",
        "text": "Here's a step-by-step guide on how to set up an integration with TodoFusion. We'll use the example of setting up a Slack integration:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion Management account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Navigate to the \"Integrations\" or \"Settings\" section in your TodoFusion dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Select the integration you want to set up (e.g., Slack)."
      },
      {
        "type": "paragraph",
        "text": "Step 4: Follow the on-screen instructions to initiate the integration."
      },
      {
        "type": "paragraph",
        "text": "Step 5: You'll typically be prompted to provide an API token or other necessary authentication information for the integration."
      },
      {
        "type": "paragraph",
        "text": "Step 6: Once you've entered the required information, click \"Save\" to activate the integration."
      },
      {
        "type": "paragraph",
        "text": "Step 7: Your TodoFusion account is now connected with the selected integration."
      },
      {
        "type": "code",
        "text": "// Example code for setting up a Slack integration with TodoFusion\nPOST /api/integrations/slack\n{\n  \"api_token\": \"your_slack_api_token\"\n}"
      },
      {
        "type": "paragraph",
        "text": "By following these steps, you can easily set up and configure integrations with external services to enhance your TodoFusion experience."
      }
    ],
    "previousSlug": "integrations",
    "nextSlug": "third-party-platforms",
    "order": 5
  },
  {
    "id": "third-party-platforms",
    "slug": "third-party-platforms",
    "title": "Third-party Platforms",
    "heading": "Third-party Platforms",
    "groupId": "integrations",
    "groupLabel": "Integrations",
    "description": "Customizing TodoFusion allows you to tailor the platform to your preferences and needs. In this section, we'll explore how you can personalize the appearance and settings in TodoFusion.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Customizing TodoFusion allows you to tailor the platform to your preferences and needs. In this section, we'll explore how you can personalize the appearance and settings in TodoFusion."
      },
      {
        "type": "heading",
        "text": "Supported Third-Party Platforms"
      },
      {
        "type": "paragraph",
        "text": "TodoFusion supports integration with a variety of third-party platforms, enabling you to streamline your workflows and collaborate more efficiently. Some of our supported third-party platforms include:"
      },
      {
        "type": "paragraph",
        "text": "Google Drive: Integrate TodoFusion with Google Drive to easily attach documents and files to your tasks."
      },
      {
        "type": "paragraph",
        "text": "GitHub: Connect Taskify with GitHub to link tasks to your repositories and track software development projects."
      },
      {
        "type": "paragraph",
        "text": "Zapier: Use Zapier to create custom automation workflows connecting Taskify with thousands of other apps and services."
      },
      {
        "type": "heading",
        "text": "Integrating with a Third-Party Platform"
      },
      {
        "type": "paragraph",
        "text": "To integrate TodoFusion with a third-party platform, you'll need to follow a few simple steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your Taskify Management account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Navigate to the \"Integrations\" or \"Settings\" section in your Taskify dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Locate the third-party platform you wish to integrate (e.g., Google Drive)."
      },
      {
        "type": "paragraph",
        "text": "Step 4: Click on the platform's name to initiate the integration setup process."
      },
      {
        "type": "paragraph",
        "text": "Step 5: Depending on the platform, you may need to provide authentication information, such as API keys or access tokens."
      },
      {
        "type": "paragraph",
        "text": "Step 6: Once you've entered the necessary information, click \"Save\" or \"Connect\" to establish the integration."
      },
      {
        "type": "code",
        "text": "// Example code for integrating TodoFusion with Google Drive\nPOST /api/integrations/google-drive\n{\n  \"api_key\": \"your_google_drive_api_key\"\n}"
      },
      {
        "type": "paragraph",
        "text": "By following these steps and utilizing the provided code block, you can seamlessly integrate TodoFusion with third-party platforms, enhancing your task management capabilities."
      }
    ],
    "previousSlug": "set-up-integrations",
    "nextSlug": "inviting-team-members",
    "order": 6
  },
  {
    "id": "inviting-team-members",
    "slug": "inviting-team-members",
    "title": "Inviting Team Members",
    "heading": "Inviting Team Members",
    "groupId": "collaboration",
    "groupLabel": "Collaboration",
    "description": "Collaboration is at the heart of TodoFusion, and inviting team members to join your workspace is an essential part of the process. In this section, we'll guide you through the steps to invite and onboard team members to your TodoFusion organization.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Collaboration is at the heart of TodoFusion, and inviting team members to join your workspace is an essential part of the process. In this section, we'll guide you through the steps to invite and onboard team members to your TodoFusion organization."
      },
      {
        "type": "heading",
        "text": "Inviting Team Members"
      },
      {
        "type": "paragraph",
        "text": "To invite team members to your TodoFusion organization, follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion Management account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Navigate to the \"Team\" or \"Members\" section in your TodoFusion dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Look for the \"Invite Team Members\" or similar button and click on it."
      },
      {
        "type": "paragraph",
        "text": "Step 4: Enter the email addresses of the team members you wish to invite. You can invite multiple members at once."
      },
      {
        "type": "paragraph",
        "text": "Step 5: Optionally, you can specify the roles or permissions for the invited team members."
      },
      {
        "type": "paragraph",
        "text": "Step 6: Click the \"Send Invitations\" button to send the invitations."
      },
      {
        "type": "heading",
        "text": "Team Member Onboarding"
      },
      {
        "type": "paragraph",
        "text": "When team members receive the invitation, they will typically receive an email with a link to join your TodoFusion organization. Here's what they need to do:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Check their email for the invitation from TodoFusion."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Click on the invitation link to join the organization."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Complete the onboarding process, which may include setting up their profiles and customizing their preferences."
      },
      {
        "type": "heading",
        "text": "Using the Code Block"
      },
      {
        "type": "paragraph",
        "text": "To programmatically invite team members using the TodoFusion API, you can use the following code example:"
      },
      {
        "type": "code",
        "text": "// Example code for inviting team members using the TodoFusion API\nPOST /api/invitations\n{\n  \"email\": \"new_member@example.com\",\n  \"role\": \"user\"\n}"
      },
      {
        "type": "paragraph",
        "text": "This code sends an invitation to the specified email address and assigns the \"user\" role to the new team member."
      },
      {
        "type": "paragraph",
        "text": "By following these steps or using the provided code block, you can efficiently invite and onboard team members to your TodoFusion organization, promoting collaboration and productivity."
      }
    ],
    "previousSlug": "third-party-platforms",
    "nextSlug": "tasks-and-deadlines",
    "order": 7
  },
  {
    "id": "tasks-and-deadlines",
    "slug": "tasks-and-deadlines",
    "title": "Tasks and Deadlines",
    "heading": "Tasks and Deadlines",
    "groupId": "collaboration",
    "groupLabel": "Collaboration",
    "description": "Managing tasks and deadlines is a fundamental aspect of effective task management. In this section, we'll explore how you can create tasks with specific deadlines and keep track of your work in TodoFusion.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Managing tasks and deadlines is a fundamental aspect of effective task management. In this section, we'll explore how you can create tasks with specific deadlines and keep track of your work in TodoFusion."
      },
      {
        "type": "heading",
        "text": "Creating a Task with a Deadline"
      },
      {
        "type": "paragraph",
        "text": "To create a task with a specific deadline in TodoFusion, follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion Management account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Navigate to the \"Tasks\" or \"To-Do\" section in your TodoFusion dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Click the \"+ New Task\" or a similar button to create a new task."
      },
      {
        "type": "paragraph",
        "text": "Step 4: Fill in the task details, including the task name, description, and priority."
      },
      {
        "type": "paragraph",
        "text": "Step 5: Set the task's due date, specifying when it needs to be completed."
      },
      {
        "type": "code",
        "text": "// Example code for creating a task with a specific deadline using TodoFusion API\nPOST /api/tasks\n{\n  \"name\": \"Complete Project Report\",\n  \"description\": \"Draft the project report for the quarterly review.\",\n  \"due_date\": \"2023-10-31\",\n  \"priority\": \"High\"\n}"
      },
      {
        "type": "heading",
        "text": "Managing Deadlines"
      },
      {
        "type": "paragraph",
        "text": "After creating a task, you can easily manage and track its deadline by:"
      },
      {
        "type": "paragraph",
        "text": "Regularly reviewing your TodoFusion dashboard to see upcoming tasks with their due dates."
      },
      {
        "type": "paragraph",
        "text": "Adjusting due dates if needed, by editing the task details or using drag-and-drop features."
      },
      {
        "type": "paragraph",
        "text": "Completing tasks on or before their deadlines to stay on top of your work."
      },
      {
        "type": "paragraph",
        "text": "By following these steps and utilizing the provided code block, you can effectively create tasks with specific deadlines and manage them within your TodoFusion platform."
      }
    ],
    "previousSlug": "inviting-team-members",
    "nextSlug": "discussions",
    "order": 8
  },
  {
    "id": "discussions",
    "slug": "discussions",
    "title": "Discussions",
    "heading": "Discussions",
    "groupId": "collaboration",
    "groupLabel": "Collaboration",
    "description": "Discussions are an essential part of teamwork and collaboration within TodoFusion. In this section, we'll explore how to create and participate in discussions to facilitate communication and information sharing.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Discussions are an essential part of teamwork and collaboration within TodoFusion. In this section, we'll explore how to create and participate in discussions to facilitate communication and information sharing."
      },
      {
        "type": "heading",
        "text": "Creating a New Discussion"
      },
      {
        "type": "paragraph",
        "text": "To start a new discussion or topic in TodoFusion, follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion Management account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Navigate to the \"Discussions\" or \"Forum\" section in your TodoFusion dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Click the \"+ New Discussion\" or a similar button to initiate a new discussion."
      },
      {
        "type": "paragraph",
        "text": "Step 4: Enter a title for your discussion to give it a clear and concise name."
      },
      {
        "type": "paragraph",
        "text": "Step 5: Add a description or content to provide context for your discussion."
      },
      {
        "type": "paragraph",
        "text": "Step 6: Optionally, select relevant tags or categories to categorize your discussion."
      },
      {
        "type": "paragraph",
        "text": "Step 7: Click the \"Create\" or \"Start Discussion\" button to create the new discussion."
      },
      {
        "type": "heading",
        "text": "Using the Code Block"
      },
      {
        "type": "paragraph",
        "text": "To programmatically create a new discussion or topic using the TodoFusion API, you can use the following code example:"
      },
      {
        "type": "code",
        "text": "// Example code for creating a new discussion using Taskify API\nPOST /api/discussions\n{\n  \"title\": \"Project Kickoff Meeting\",\n  \"content\": \"Let's discuss the agenda and schedule for the upcoming project kickoff meeting.\",\n  \"tags\": [\"meeting\", \"project\"]\n}"
      },
      {
        "type": "paragraph",
        "text": "This code sends a request to the TodoFusion API to create a new discussion with the specified title, content, and tags."
      },
      {
        "type": "paragraph",
        "text": "By following these steps or using the provided code block, you can easily create and engage in discussions to foster collaboration and information sharing within your TodoFusion platform."
      }
    ],
    "previousSlug": "tasks-and-deadlines",
    "nextSlug": "task-automation",
    "order": 9
  },
  {
    "id": "task-automation",
    "slug": "task-automation",
    "title": "Task Automation",
    "heading": "Task Automation",
    "groupId": "advanced-features",
    "groupLabel": "Advanced features",
    "description": "Task automation can help you save time and increase productivity by streamlining routine tasks. In this section, we'll explore how to set up task automation in TodoFusion.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Task automation can help you save time and increase productivity by streamlining routine tasks. In this section, we'll explore how to set up task automation in TodoFusion."
      },
      {
        "type": "heading",
        "text": "Automating a Task"
      },
      {
        "type": "paragraph",
        "text": "To automate a specific task in TodoFusion, you can create task automation rules. These rules enable you to define conditions under which a task should be automatically triggered. Follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion Management account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Navigate to the \"Automation\" or \"Rules\" section in your TodoFusion dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Click the \"Create New Rule\" or similar button to set up a new task automation rule."
      },
      {
        "type": "paragraph",
        "text": "Step 4: Define the trigger conditions for the rule. For example, you can specify that a task should be created or updated when certain criteria are met."
      },
      {
        "type": "paragraph",
        "text": "Step 5: Configure the actions that should be taken when the trigger conditions are met. This might include creating a new task, updating an existing task, or sending notifications."
      },
      {
        "type": "paragraph",
        "text": "Step 6: Save the automation rule."
      },
      {
        "type": "heading",
        "text": "Using the Code Block"
      },
      {
        "type": "paragraph",
        "text": "To programmatically set up task automation using the TodoFusion API, you can use the following code example:"
      },
      {
        "type": "code",
        "text": "// Example code for creating a task automation rule using TodoFusion API\nPOST /api/automation/rules\n{\n  \"name\": \"Meeting Reminder\",\n  \"trigger_condition\": \"meeting_date == today\",\n  \"action\": \"create_task\",\n  \"task_details\": {\n    \"name\": \"Meeting Reminder Task\",\n    \"description\": \"Send a meeting reminder for today's meeting\",\n    \"due_date\": \"today\"\n  }\n}"
      },
      {
        "type": "paragraph",
        "text": "This code sends a request to the TodoFusion API to create a task automation rule that triggers the creation of a meeting reminder task when the meeting date matches the current day."
      },
      {
        "type": "paragraph",
        "text": "By following these steps or using the provided code block, you can automate specific tasks to simplify your task management process in TodoFusion."
      }
    ],
    "previousSlug": "discussions",
    "nextSlug": "reporting-and-analytics",
    "order": 10
  },
  {
    "id": "reporting-and-analytics",
    "slug": "reporting-and-analytics",
    "title": "Reporting",
    "heading": "Reporting",
    "groupId": "advanced-features",
    "groupLabel": "Advanced features",
    "description": "Reports and analytics help you gain insights into your task management and track progress. In this section, we'll explore how to generate reports on task completion in TodoFusion.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Reports and analytics help you gain insights into your task management and track progress. In this section, we'll explore how to generate reports on task completion in TodoFusion."
      },
      {
        "type": "heading",
        "text": "Generating a Task Completion Report"
      },
      {
        "type": "paragraph",
        "text": "To generate a report on task completion in TodoFusion, follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion Management account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Navigate to the \"Reports\" or \"Analytics\" section in your TodoFusion dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Select the type of report you want to generate, such as \"Task Completion Report.\""
      },
      {
        "type": "paragraph",
        "text": "Step 4: Choose the date range or criteria for the report. For example, you can select a specific time frame or filter tasks by status."
      },
      {
        "type": "paragraph",
        "text": "Step 5: Click the \"Generate Report\" or similar button to create the report."
      },
      {
        "type": "paragraph",
        "text": "Step 6: View and download the generated report, which may include statistics on completed tasks, task duration, and more."
      },
      {
        "type": "heading",
        "text": "Using the Code Block"
      },
      {
        "type": "paragraph",
        "text": "To programmatically generate a task completion report using the TodoFusion API, you can use the following code example:"
      },
      {
        "type": "code",
        "text": "// Example code for generating a task completion report using TodoFusion API\nGET /api/reports/task-completion\n{\n  \"start_date\": \"2023-01-01\",\n  \"end_date\": \"2023-12-31\",\n  \"status\": \"completed\"\n}"
      },
      {
        "type": "paragraph",
        "text": "This code sends a request to the TodoFusion API to generate a report on task completion for the specified date range and status."
      },
      {
        "type": "paragraph",
        "text": "By following these steps or using the provided code block, you can generate task completion reports to assess your task management performance in TodoFusion."
      }
    ],
    "previousSlug": "task-automation",
    "nextSlug": "customizing-todofusion",
    "order": 11
  },
  {
    "id": "customizing-todofusion",
    "slug": "customizing-todofusion",
    "title": "Customizing Todo",
    "heading": "Customizing Todo",
    "groupId": "advanced-features",
    "groupLabel": "Advanced features",
    "description": "Customizing TodoFusion allows you to tailor the platform to your preferences and needs. In this section, we'll explore how you can personalize the appearance and settings in TodoFusion.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Customizing TodoFusion allows you to tailor the platform to your preferences and needs. In this section, we'll explore how you can personalize the appearance and settings in TodoFusion."
      },
      {
        "type": "heading",
        "text": "Changing the Theme"
      },
      {
        "type": "paragraph",
        "text": "To change the appearance of TodoFusion, follow these steps:"
      },
      {
        "type": "paragraph",
        "text": "Step 1: Log in to your TodoFusion Management account."
      },
      {
        "type": "paragraph",
        "text": "Step 2: Navigate to the \"Settings\" or \"Appearance\" section in your TodoFusion dashboard."
      },
      {
        "type": "paragraph",
        "text": "Step 3: Look for options related to changing the theme or color scheme."
      },
      {
        "type": "paragraph",
        "text": "Step 4: Select your preferred theme or customize colors as desired."
      },
      {
        "type": "paragraph",
        "text": "Step 5: Save your theme preferences."
      },
      {
        "type": "heading",
        "text": "Using the Code Block"
      },
      {
        "type": "paragraph",
        "text": "To programmatically change the theme or appearance settings using the TodoFusion API, you can use the following code example:"
      },
      {
        "type": "code",
        "text": "// Example code for changing the theme in TodoFusion using TodoFusion API\nPATCH /api/settings/theme\n{\n  \"theme\": \"dark\"\n}"
      },
      {
        "type": "paragraph",
        "text": "This code sends a request to the TodoFusion API to update the theme to \"dark.\""
      },
      {
        "type": "paragraph",
        "text": "By following these steps or using the provided code block, you can customize the appearance and settings of your TodoFusion platform to match your personal preferences."
      }
    ],
    "previousSlug": "reporting-and-analytics",
    "nextSlug": null,
    "order": 12
  }
];
